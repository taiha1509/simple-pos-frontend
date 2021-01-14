import { Col, Row } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import './css/order.css';
import OrderDetail from "./OrderDetail";
import TabDrawer from "./TabDrawer";

const OrderHistory = (props) => {
    const [listOrderWithDate, setListOrderWithDate] = useState(undefined);
    const [chosenOrder, setChosenOrder] = useState();
    const [tabDrawerVisible, setTabDrwerVisible] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        const lsOrder = sortOrderByDate(props.orders);
        setListOrderWithDate(lsOrder);
    }, [props.orders])


    const sortOrderByDate = (orders) => {
        let result = [{
            item: [

            ],
            date: ''
        }]
        orders.data.items.forEach((value, index) => {
            if (index == 0) {
                // result[0].item = []
                result[0].item.push(value);
                result[0].date = convertStringToDate(value.created_at);
            } else {
                let flag = false;
                result.forEach((e, i) => {
                    if (e.date.getTime() == convertStringToDate(value.created_at).getTime()) {
                        result[i].item.push(value);
                        flag = true;
                    }
                })

                if (!flag) {
                    const item = {
                        item: [
                            value
                        ],
                        date: convertStringToDate(value.created_at)
                    }
                    result.push(item);
                }
            }
        });
        result.reverse();
        return result;
    }

    const convertStringToDate = (dateString) => {
        const ymd = dateString.split(' ')[0];
        const arrayDate = ymd.split('-');
        return new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
    }


    const onSearch = (value) => {
        setTextSearch(value);
    }

    const onInputChange = (e) => {
        if (!e.target.value) {
            setTextSearch('');
        }
    }

    const handleClickOrderItem = (item) => {
        document.getElementById('title').innerHTML = item.entity_id;

        setChosenOrder(item);
    }

    const closeTabDrawer = () => {
        setTabDrwerVisible(false);
    }
    return (
        <div>
            <Row className='row1'>
                <Col span={7} className='row1-col1'>
                    <a onClick={() => { setTabDrwerVisible(true) }}><img src='icons8-menu-48.png'></img></a>
                    <span>
                        Orders
                </span>
                </Col>
                <Col span={17} className='row1-col2'>
                    <div>
                        <h2 id='title'></h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={7} className='row2-col1'>
                    <div>
                        <Search placeholder="input search text" onSearch={onSearch} onChange={onInputChange} />
                    </div>
                    <ul style={{ padding: '0px 0px' }}>
                        {listOrderWithDate ? listOrderWithDate.map((value, index) => {

                            let flag = false;
                            value.item.forEach((e, i) => {
                                let fullname = '';
                                if (e.customer_firstname)
                                    fullname += ' ' + e.customer_firstname;
                                if (e.customer_middlename)
                                    fullname += ' ' + e.customer_middlename;
                                if (e.customer_lastname)
                                    fullname += ' ' + e.customer_lastname;
                                    
                                if (e.customer_email.toLowerCase().includes(textSearch.toLowerCase()) || fullname.toLowerCase().includes(textSearch.toLowerCase())) {
                                    flag = true;
                                }
                            })
                            if (flag) {
                                return (
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#ced0d6' }}>
                                            <span >{value.date.getDate() + '/' + value.date.getMonth() + 1 + '/' + value.date.getFullYear()}</span>
                                        </div>
                                        {value.item.map((e, i) => {
                                            let fullname = '';
                                            if (e.customer_firstname)
                                                fullname += ' ' + e.customer_firstname;
                                            if (e.customer_middlename)
                                                fullname += ' ' + e.customer_middlename;
                                            if (e.customer_lastname)
                                                fullname += ' ' + e.customer_lastname;



                                            console.log(fullname);
                                            if (e.customer_email.toLowerCase().includes(textSearch.toLowerCase()) || fullname.toLowerCase().includes(textSearch.toLowerCase())) {
                                                flag = true;
                                            }
                                            if (flag) {
                                                return (
                                                    <a onClick={() => handleClickOrderItem(e)} className='wrapper-order-item'>
                                                        <div>
                                                            <h3>{e.entity_id}</h3>
                                                            <p>{e.state}</p>
                                                        </div>
                                                        <div>
                                                            <h3>${e.grand_total}</h3>
                                                            <p>{e.status}</p>
                                                        </div>
                                                    </a>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            }
                        }) : ''}
                    </ul>
                </Col>
                <Col span={17} className='row2-col2'>
                    <OrderDetail item={chosenOrder} />
                </Col>
            </Row>

            <TabDrawer visible={tabDrawerVisible} closeTabDrawer={closeTabDrawer} />
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        orders: state.order,

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);