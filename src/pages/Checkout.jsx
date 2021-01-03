import { Row, Col, Input, Popover, Button } from 'antd';
import { useState } from 'react';
import './css/checkout.css';
import TabDrawer from './TabDrawer';
import AddCustomer from './ModalAddCustomer';

const Checkout = () => {

    const [visible, setVisible] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [tabDrawerVisible, setTabDrwerVisible] = useState(false);
    const [isModalAddCustomerVisible, setIsModalAddCustomerVisible] = useState(false);

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
    const onSearch = value => console.log(value);

    const customerOrGuest = () => {
        if (currentCustomer) {
            return (
                <h2></h2>
            );
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

    return (
        <div>
            <Row className="row-header">
                <Col span={1} className='align-center col1'>
                    <a onClick={() => setTabDrwerVisible(true)}><img id='menu-icon' src="icons8-menu-48.png" alt="image"></img></a>
                </Col>
                <Col span={5} className='align-center col2'>
                    <h2 style={{margin: + "15"}}>Cart</h2>
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
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 1000 }} />
                </Col>
            </Row>

            <Row className="row-content">
                <Col span={1} className='align-center col1'>
                    <div className='icons-bar'>
                        <a>
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
                </Col>
                <Col span={5} className='align-center col2'>
                    <div class='customer-side'>
                        <div class='customer-link-side'>
                            <a style={{ display: "flex", width: '85%' }} onClick={() => {
                                if(isEmpty(currentCustomer)){
                                    setIsModalAddCustomerVisible(true);
                                }else{
                                    //TODO infe customer
                                }
                            }}>
                                <img src='icons8-customer.png' alt='customer' id='icon-customer'></img>
                                <h2 style={{ width: '80%', margin: 15, textAlign: 'left' }}>{!isEmpty(currentCustomer) ? currentCustomer.name : 'Guest'}</h2>
                            </a>
                            <a>
                                <img src={!isEmpty(currentCustomer) ? 'icons8-denied.png' : ''} id='icon-remove-customer'></img>
                            </a>
                        </div>
                    </div>
                </Col>
                <Col span={18} className='search-bar col3'>

                </Col>
            </Row>

            <TabDrawer visible={tabDrawerVisible} closeTabDrawer={closeTabDrawer} />
            <AddCustomer isModalVisible={isModalAddCustomerVisible} setIsModalVisiblle={handleModalAddCustomerVisible}/>
        </div>
    )
}

export default Checkout;