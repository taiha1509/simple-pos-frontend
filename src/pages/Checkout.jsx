import { Row, Col, Input, Popover, Button, Pagination, Modal, Space, Spin, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './css/checkout.css';
import TabDrawer from './TabDrawer';
import AddCustomer from './ModalAddCustomer';
import { connect } from 'react-redux';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { fetchProduct } from '../actions/ProductAction';
import { range } from 'rxjs';
import { chooseGuest } from '../actions/CustomerAction';
import { formatter, formatMoney } from '../helper/index';
import { BASE_IMG_URL, logicType } from '../constants/index';
import { cartUpdate, holdCart } from '../actions/CartAction';
import { fetchOrder, placeorder } from '../actions/OrderAction';
import ListProduct from './ListProduct';
import { useHistory } from 'react-router-dom';
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

    useEffect(() => {
        if (props.processingPlaceorder) {
            setTimeout(() => {
                notification.success({
                    description: "order successfully",
                    message: 'notification'
                })
            }, 1000);
        }
        setMark(Math.random());
    }, [props.processingPlaceorder])

    useEffect(() => {
        let cart_temp = Object.assign({}, props.cartProps);
        cart_temp.customer = props.chosenCustomer;
        props.cartChange(cart_temp);
    }, [props.chosenCustomer]);


    //state of component
    const [visible, setVisible] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [tabDrawerVisible, setTabDrwerVisible] = useState(false);
    const [isModalAddCustomerVisible, setIsModalAddCustomerVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keySearch, setKeySearch] = useState('');
    const [isModalCommentVisible, setIsModalCommentVisible] = useState(false);
    const [mark, setMark] = useState(1);
    const isMounted = useRef(false);


    useEffect(() => {
        props.fetchProduct(null, 1, 10);
        console.log('fetch product');
    }, [])

    // hanfle search function
    useEffect(() => {
        if (isMounted.current) {
            props.fetchProduct([{
                field: 'name',
                value: '%25' + keySearch + '%25',
                condition_type: 'like',
                logic: logicType.OR
            },
            {
                field: 'sku',
                value: '%25' + keySearch + '%25',
                condition_type: 'like',
                logic: logicType.OR
            }
            ], currentPage, pageSize);
            // isMounted.current = false;
        } else {
            isMounted.current = true
        }
    }, [keySearch])

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

    const getTotalItem = () => {
        let total_item = 0;
        props.cartProps.products.forEach((value, index) => {
            total_item += value.qty;
        });
        return total_item;
    }



    const removeCustomer = () => {
        props.removeCustomer();
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

    const onPlaceorder = () => {
        const orderPayload = props.posInfo;
        props.placeorder(props.cartProps, orderPayload);
    }

    const removeItem = (item) => {
        // const addToCart = (product) => {
        //     let cart_temp = Object.assign({}, props.cartProps);
        //     let isNewItems = true;
        //     //check if product is exist in current cart
        //     cart_temp.products.forEach((element, index) => {
        //         if (!element.item) {
        //             cart_temp.products[index].qty = 1;
        //             cart_temp.products[index].item = product;
        //             isNewItems = false;
        //         } else if (JSON.stringify(product) === JSON.stringify(element.item)) {
        //             cart_temp.products[index].qty++;
        //             isNewItems = false
        //         }
    
        //     });
    
        //     if (isNewItems) {
        //         cart_temp.products.push({
        //             item: product,
        //             qty: 1
        //         });
        //     }
    
        //     // caculate total_price
        //     cart_temp.total_price += product.price;
    
        //     props.cartChange(cart_temp);
        // }

        let cart_temp = Object.assign({}, props.cartProps);
        cart_temp.products.forEach((element, index) => {
            if(element.item.id == item.item.id){
                
                if(element.qty > 1){
                    cart_temp.products[index].qty --;
                    cart_temp.total_price -= item.item.price;
                }else{
                    // this case qty = 1
                    if(cart_temp.products.length > 1){
                        cart_temp.products.splice(index, index + 1);
                        cart_temp.total_price -= item.item.price;
                    }else{
                        //cart null
                        cart_temp.products = [{
                            qty: 0,
                            item: null
                        }]
                        cart_temp.total_price = 0;
                    }
                }
            }
        });  

        props.cartChange(cart_temp);
    }

    return (
        <div>
            { (!props.isLoadingOrder && !props.isLoadingCustomer) ? <div><Row className="row-header">
                <Col span={1} className='align-center col1'>
                    <a onClick={() => {
                        setTabDrwerVisible(true);
                    }}><img id='menu-icon' src="icons8-menu-48.png" alt="image"></img></a>
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
                            <a onClick={onHoldCart}>
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
                            {props.cartProps.products ? props.cartProps.products.map((value, index) => {
                                if (value.item) {
                                    return (
                                        <div className='cart-item-wrapper'>
                                            <a className='cart-item'>
                                                <div className='cart-item-image'>
                                                    <img src={BASE_IMG_URL + value.item.custom_attributes[0].value} />
                                                    <p className='cart-item-qty'>{value.qty}</p>
                                                </div>
                                                <h3 className='cart-item-name'>{value.item.name}</h3>
                                                <p className='cart-item-price'>${value.item.price * value.qty}</p>
                                            </a>
                                            <a>
                                                <img src='rm.png' className='icon-remove-item' onClick={() => removeItem(value)}></img>
                                            </a>
                                        </div>

                                    )
                                }
                            }) : ''}
                        </div>

                        <div className="interact-cart">
                            <a className='hold-button' onClick={onHoldCart}><h1>Hold</h1></a>
                            <a className='placeorder-button' onClick={onPlaceorder}><h1>${formatMoney(props.cartProps.total_price)}</h1></a>
                        </div>
                    </Col>

                        {/* side for product */}
                        <Col span={18} className='col3' style={{ backgroundColor: '#f0f0f0' }}>
                            {(!props.processingPlaceorder && !props.isLoadingProduct) ?
                                <ListProduct currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageSize={pageSize}
                                    setPageSize={setPageSize}
                                    products={props.listProduct}
                                /> : <div style={{ textAlign: 'center', margin: '45vh' }}>
                                    <Space size='middle'>
                                        <Spin size='large' />
                                    </Space>
                                </div>}

                        </Col>
                </Row>

                    <TabDrawer visible={tabDrawerVisible} closeTabDrawer={closeTabDrawer} />
                    <AddCustomer isModalVisible={isModalAddCustomerVisible} setIsModalVisiblle={handleModalAddCustomerVisible} />

                    {/* comment side */}
                    <Modal title="Add comment to this order" visible={isModalCommentVisible} onOk={handleCommentOk} onCancel={handleCommentCancel}>
                        <TextArea rows={4} onChange={onChangComment} value={props.cartProps.comment} />
                    </Modal></div> : <div style={{ textAlign: 'center', margin: '45vh' }}>
                    <Space size='middle'>
                        <Spin size='large' />
                    </Space>
                </div>
            }
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
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);