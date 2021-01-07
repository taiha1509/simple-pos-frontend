import { Row, Col, Input, Popover, Button, Pagination, Modal } from 'antd';
import { useEffect, useState } from 'react';
import './css/checkout.css';
import TabDrawer from './TabDrawer';
import AddCustomer from './ModalAddCustomer';
import { connect } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { fetchProduct } from '../actions/ProductAction';
import { range } from 'rxjs';
import { chooseGuest } from '../actions/CustomerAction';
import { formatter, formatMoney } from '../helper/index';
import { BASE_IMG_URL } from '../constants/index';
import { cartUpdate, holdCart } from '../actions/CartAction';
const Checkout = (props) => {

    const INITAL_CART = {
        products: [{
            qty: 0,
            item: null
        }],
        comment: '',
        customer: null,
        total_price: 0,
        staff: props.staff,
    }

    const [visible, setVisible] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [tabDrawerVisible, setTabDrwerVisible] = useState(false);
    const [isModalAddCustomerVisible, setIsModalAddCustomerVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keySearch, setKeySearch] = useState('');
    const [totalItemCurrentPage, setTotalItemCurrentPage] = useState(0);
    const [isModalCommentVisible, setIsModalCommentVisible] = useState(false);

    let total = 0;
    let total_price = 0;

    const { TextArea } = Input;

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = visible => {
        setVisible(visible);
    };

    const closeTabDrawer = () => {
        setTabDrwerVisible(false)
    }


    const { Search } = Input;


    const onSearch = (value) => {
        setKeySearch(value);
    }

    const onInputChange = (e) => {
        if (!e.target.value) {
            setKeySearch('');
        }
    }

    const handleModalAddCustomerVisible = (val) => {
        setIsModalAddCustomerVisible(val);
    }

    const isEmpty = (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    const handlePagination = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        props.fetchProduct(page, size);
    }



    const onShowSizeChange = (current, size) => {
        setPageSize(size);
    }

    const showTotal = () => {
        return `Total ${total} items`
    }

    const getTotalItem = () => {
        let total_item = 0;
        props.cartProps.products.forEach((value, index) => {
            total_item += value.qty;
        }); 
        console.log(total_item);
        return total_item;
    }

    useEffect(() => {
        setTotalItemCurrentPage(0);
    });

    useEffect(() => {
        let cart_temp = Object.assign({}, props.cartProps);
        cart_temp.customer = props.chosenCustomer;
        props.cartChange(cart_temp);
    }, [props.chosenCustomer]);

    const removeCustomer = () => {
        props.removeCustomer();
    }

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

    // remove all item of cart
    const onHoldCart = () => {
        props.cartHold();
    }

    const onAddComment = () => {
        setIsModalCommentVisible(true);
    }

    const handleCommentOk = () => {
        setIsModalCommentVisible(false);
    }

    const handleCommentCancel = () => {
        setIsModalCommentVisible(false);
        let cart_temp = Object.assign({}, props.cartProps);
        cart_temp.comment = '';
        props.cartChange(cart_temp);
    }

    const onChangComment = (e) => {
        let cart_temp = Object.assign({}, props.cartProps);
        cart_temp.comment = e.target.value;
        props.cartChange(cart_temp);
    }

    return (
        <div>
            <Row className="row-header">
                <Col span={1} className='align-center col1'>
                    <a onClick={() => setTabDrwerVisible(true)}><img id='menu-icon' src="icons8-menu-48.png" alt="image"></img></a>
                </Col>
                <Col span={5} className='align-center col2'>
                    <h2 style={{ margin: + "15" }}>Cart</h2>
                </Col>
                <Col span={18} className='search-bar col3'>
                    <Popover
                        content={<a onClick={() => (hide)}>Close</a>}
                        title="Title"
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        className='popover-product'
                    >
                        <Button>Products</Button>
                    </Popover>
                    <Search placeholder="input search text" onSearch={onSearch} onChange={onInputChange} style={{ width: 1000 }} />
                </Col>
            </Row>

            <Row className="row-content">
                <Col span={1} className='align-center col1'>
                    <div className='icons-bar'>
                        <a onClick={onAddComment}>
                            <img src='icons8-comments.png'></img>
                        </a>
                    </div>
                    <div className='icons-bar'>
                        <a>
                            <img src='delete-forever.png'></img>
                        </a>
                    </div>
                    <div className='icons-bar'>
                        <a>
                            <img src='icons8-create-order-64.png'></img>
                        </a>
                    </div>
                    {props.cartProps.total_price > 0 ? (<div className='icon-cart'>
                        <a style={{ position: 'relative' }}>
                            <img src='cart.png'></img>
                            <p className='cart-item-qty'>{getTotalItem()}</p>
                        </a>
                    </div>) : ''}
                </Col>
                <Col span={5} className='align-center col2 cart-side'>
                    <div class='customer-side'>
                        <div class='customer-link-side'>
                            <a style={{ display: "flex", width: '85%' }} onClick={() => { setIsModalAddCustomerVisible(true); }}>
                                <img src='icons8-customer.png' alt='customer' id='icon-customer'></img>
                                <h2 style={{ width: '80%', margin: 15, textAlign: 'left' }}>{props.chosenCustomer ? (props.chosenCustomer.firstname + ' ' + props.chosenCustomer.lastname) : 'Guest'}</h2>

                            </a>
                            {props.chosenCustomer ? <a>
                                <img onClick={removeCustomer} src='remove.png' style={{ right: '10px', top: '15px', position: 'absolute', width: '20px' }}></img>
                            </a> : ''}
                        </div>
                    </div>


                    <div className='cart-content'>
                        {props.cartProps.products.map((value, index) => {
                            console.log(value.item);
                            if (value.item) {
                                return (
                                    <a className='cart-item'>
                                        <div className='cart-item-image'>
                                            <img src={BASE_IMG_URL + value.item.custom_attributes[0].value} />
                                            <p className='cart-item-qty'>{value.qty}</p>
                                        </div>
                                        <h3 className='cart-item-name'>{value.item.name}</h3>
                                        <p className='cart-item-price'>${value.item.price * value.qty}</p>
                                    </a>
                                )
                            }
                        })}
                    </div>

                    <div className="interact-cart">
                        <a className='hold-button' onClick={onHoldCart}><h1>Hold</h1></a>
                        <a className='placeorder-button'><h1>${formatMoney(props.cartProps.total_price)}</h1></a>
                    </div>
                </Col>

                {/* side for product */}
                <Col span={18} className='col3' style={{ backgroundColor: '#f0f0f0' }}>
                    <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', paddingLeft: '10px' }}>
                        {props.listProduct.map((value, index) => {
                            if(value.type_id == 'simple' && value.qty > 0){
                                if (value.name.toLowerCase().includes(keySearch.toLowerCase()) || value.sku.toLowerCase().includes(keySearch.toLowerCase())) {
                                    // setTotalItemCurrentPage(e => e + 1);
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
                                }
                            }

                        })}

                    </ul>
                    <Pagination
                        total={props.total_count}
                        showSizeChanger
                        showQuickJumper
                        showTotal={showTotal}
                        onChange={handlePagination}
                        current={currentPage}
                        onShowSizeChange={onShowSizeChange}
                        pageSize={pageSize}
                    />
                </Col>
            </Row>

            <TabDrawer visible={tabDrawerVisible} closeTabDrawer={closeTabDrawer} />
            <AddCustomer isModalVisible={isModalAddCustomerVisible} setIsModalVisiblle={handleModalAddCustomerVisible} />

            {/* comment side */}
            <Modal title="Add comment to this order" visible={isModalCommentVisible} onOk={handleCommentOk} onCancel={handleCommentCancel}>
                <TextArea rows={4} onChange={onChangComment} value={props.cartProps.comment} />
            </Modal>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        listProduct: state.product.data.items,
        total_count: state.product.data.total_count,
        chosenCustomer: state.customer.chosenCustomer,
        staff: state.staff.staff.staff,
        cartProps: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (currentPage, pageSize) => dispatch(fetchProduct(null, currentPage, pageSize)),
        removeCustomer: () => dispatch(chooseGuest()),
        cartChange: (payload) => dispatch(cartUpdate(payload)),
        cartHold: () => dispatch(holdCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);