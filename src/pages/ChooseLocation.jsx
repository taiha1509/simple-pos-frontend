import { chooseLocation } from '../actions/StaffAction';
import {fetchCustomer} from '../actions/CustomerAction';
import {fetchOrder} from '../actions/OrderAction';
import {fetchProduct} from '../actions/ProductAction';
import { Row, Col } from 'antd';
import './css/chooseLocation.css';

const { connect } = require("react-redux")


const ChooseLocation = (props) => {

    const dispatchChooseLoaction = (payload) => {
        props.chooseLocation(payload);
    }

    return (
        <div>
            <Row>
                <Col span={9} >
                </Col>
                <Col span={6} >
                    <div className='pos-wrapper'>
                        <img src='/icon-login.png' id='icon-magestore' ></img>
                        {props.staff ? props.staff.list_pos.map(element => {
                            return (
                                <a onClick={() => dispatchChooseLoaction(element)} className='posElement'>
                                    <h1>{element.name}</h1>
                                </a>
                            )
                        }): ''}
                        <p style={{textAlign: 'center'}}>please choose your location</p>
                    </div>
                </Col>
                <Col span={9} >
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        staff: state.staff.staff,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        chooseLocation: (payload) => {
            dispatch(chooseLocation(payload));
            dispatch(fetchProduct(null, 1, 10));
            dispatch(fetchOrder(payload));
            dispatch(fetchCustomer());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLocation);