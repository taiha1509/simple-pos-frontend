import { Pagination, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cartUpdate, holdCart } from "../actions/CartAction";
import { chooseGuest, fetchCustomerFulfiled } from "../actions/CustomerAction";
import { fetchOrder, placeorder } from "../actions/OrderAction";
import { fetchProduct } from "../actions/ProductAction";
import { BASE_IMG_URL } from "../constants";
import './css/listProduct.css';

const INITIAL_CHIDREN_PRODUCT = {

}

const ListProduct = (props) => {

    let total = 0;

    const [childProductVisible, setChildProductVisible] = useState(false);
    const [chidrenProduct, setChidrenProduct] = useState([]);

    const addToCart = (product) => {
        let cart_temp = Object.assign({}, props.cartProps);
        let isNewItems = true;
        //check if product is exist in current cart
        cart_temp.products.forEach((element, index) => {
            if (!element.item) {
                cart_temp.products[index].qty = 1;
                cart_temp.products[index].item = product;
                isNewItems = false;
            } else if (JSON.stringify(product) === JSON.stringify(element.item)) {
                cart_temp.products[index].qty++;
                isNewItems = false
            }

        });

        if (isNewItems) {
            cart_temp.products.push({
                item: product,
                qty: 1
            });
        }

        // caculate total_price
        cart_temp.total_price += product.price;

        props.cartChange(cart_temp);
    }

    const showTotal = () => {
        return `Total ${total} items`
    }

    const handlePagination = (page, size) => {
        props.setCurrentPage(page);
        props.setPageSize(size);
        props.fetchProduct(null, page, size);
    }

    const onShowSizeChange = (current, size) => {
        props.setPageSize(size);
    }

    const showChildProduct = (listProduct) => {
        setChildProductVisible(true);
        setChidrenProduct(listProduct);
    }

    const onOk = () => {
        setChildProductVisible(false);
    }

    const onCancel = () => {
        setChildProductVisible(false);
    }

    return (
        <div>
            <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
                {props.products.map((value, index) => {
                    if (value.type_id == 'simple' && value.qty > 0 && value.id == value.parent_id) {
                        total++;
                        return (
                            <li className='product-item'>
                                <a onClick={() => addToCart(value)}>
                                    <img className='thumnail-image-product' src={BASE_IMG_URL + value.custom_attributes[0].value} ></img>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <h3 style={{ width: '75%', paddingLeft: '10px' }}>{value.name} </h3>
                                            <h3 style={{ width: '25%' }}>{value.qty}</h3>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <h3 style={{ width: + 75 + '%', paddingLeft: '10px' }}>{value.sku}</h3>
                                            <h3 style={{ width: + 20 + '%' }}>{value.price} $</h3>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )
                    } else if (value.type_id == "configurable") {
                        total++;
                        const listProduct = props.products.filter((item, i) => {
                            if (item.parent_id == value.id) {
                                return item;
                            }
                        });
                        return (
                            <li className='product-item'>
                                <a onClick={() => showChildProduct(listProduct)}>
                                    <img className='thumnail-image-product' src={BASE_IMG_URL + value.custom_attributes[0].value} ></img>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <h3 style={{ width: '75%', paddingLeft: '10px' }}>{value.name} </h3>
                                            <h3 style={{ width: '25%' }}>available</h3>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <h3 style={{ width: + 75 + '%', paddingLeft: '10px' }}>{value.sku}</h3>
                                            <h3 style={{ width: + 20 + '%' }}>configure</h3>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        )
                    }

                    

                })}
                <Modal
                        visible={childProductVisible}
                        onOk={onOk}
                        onCancel={onCancel}
                        title='list product'
                        centered
                        style={{ height: 'calc(50%)'    }}
                        bodyStyle={{backgroundColor: '#f8f8f8', overflow: 'scroll'}}
                    >
                        {chidrenProduct ? chidrenProduct.map((value, index) => (
                            <a onClick={() => addToCart(value)} className="wrapper-child-item">
                                <img className='thumnail-child-image' src={BASE_IMG_URL+ value.custom_attributes[0].value}></img>
                                <div><h3>{value.name}</h3></div>
                                <div>
                                    <h3>{value.price}</h3>
                                    <h3>{value.qty}</h3>
                                </div>
                            </a>
                        )) : ''}
                    </Modal>
            </ul>
            <Pagination
                total={props.total_count}
                showSizeChanger
                showQuickJumper
                showTotal={showTotal}
                onChange={handlePagination}
                current={props.currentPage}
                onShowSizeChange={onShowSizeChange}
                pageSize={props.pageSize}
            />
            {/* <Link to="/order-hostory">Home</Link> */}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    // if (state.product.data) {
    return {
        listProduct: state.product.data.items,
        total_count: state.product.data.total_count,
        chosenCustomer: state.customer.chosenCustomer,
        staff: state.staff.staff.staff,
        cartProps: state.cart,
        isLoadingProduct: state.product.isLoadingProduct,
        isLoadingOrder: state.order.isLoadingOrder,
        isLoadingCustomer: state.customer.isLoadingCustomer,
        posInfo: state.staff.posInfo,
        processingPlaceorder: state.cart.processingPlaceorder,
    }
    // }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProduct: (filter, page, pageSize) => dispatch(fetchProduct(filter, page, pageSize)),
        removeCustomer: () => dispatch(chooseGuest()),
        cartChange: (payload) => dispatch(cartUpdate(payload)),
        cartHold: () => dispatch(holdCart()),
        placeorder: (cart, orderPayload) => {
            dispatch(placeorder(cart));
            dispatch(fetchProduct(null, 1, 10));
            dispatch(fetchOrder(orderPayload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);