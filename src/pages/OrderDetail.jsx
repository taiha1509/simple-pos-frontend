import { Empty } from "antd";
import { connect } from "react-redux"
import './css/orderDetail.css';

const OrderDetail = (props) => {

    const isEmpty = (map) => {
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    const convertStringToDate = (dateString) => {
        const ymd = dateString.split(' ')[0];
        const arrayDate = ymd.split('-');
        return new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
    }

    // const getCustomerName()

    const date = props.item ? convertStringToDate(props.item.created_at) : null;
    return (
        <div style={{ backgroundColor: 'rgb(241, 241, 241);' }}>
            {props.item ? <div>
                <h1>${props.item.grand_total}</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className='customer-staff' style={{ width: '45%', backgroundColor: '#ededed' }}>
                        <h3>Order Date: {date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()}</h3>
                        <h3>Location: {props.posInfo.name}</h3>
                        <h3>Customer: {props.item.customer_firstname + ' ' + props.item.customer_lastname}</h3>
                        <h3>Staff: firstname lastname</h3>
                        <div style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                            <h3 id='state-item'>{props.item.state}</h3>
                            <h3 id='status-item'>{props.item.status}</h3>
                        </div>
                    </div>

                    <div className='price-side' style={{ width: '45%', backgroundColor: '#ededed' }}>
                        <div className='nothing'>
                            <h3>Subtotal</h3>
                            <h3>${props.item.subtotal}</h3>
                        </div>
                        <div className='nothing'>
                            <h3>Discount</h3>
                            <h3>${props.item.discount_amount}</h3>
                        </div>
                        <div className='nothing'>
                            <h3>Shipping</h3>
                            <h3>${props.item.shipping_amount}</h3>
                        </div>
                        <div className='nothing'>
                            <h3>
                                Grand Total
                            </h3>
                            <h3>{props.item.grand_total}</h3>
                        </div>
                        <div className='nothing'>
                            <h3>Total Paid</h3>
                            <h3>{props.item.grand_total}</h3>

                        </div>
                    </div>
                </div>

                <br></br>

                <div className='list-item-ordered-side'>
                    <div className='line-under'>
                        <h3 id='items-orderd'>Items Ordered</h3>
                    </div>

                    <div>
                        <h3></h3>
                    </div>
                </div>



                <div className='wrapper-pay-ship'>
                    <div className='payment-method'>
                        <div className='line-under'>
                            <h3>Payment Method</h3>
                        </div>
                        <div>
                            <div>
                                <h3>Cash</h3>
                                <p>{date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear()}</p>
                            </div>
                            <div>
                                <h3>{props.item.status}</h3>
                                <h3>{props.item.grand_total}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='shipping-method'>
                        <div className='line-under'>
                            <h3>Shipping Method</h3>
                        </div>
                        <div>
                            <h3>Pickup-at-store</h3>
                            <h3>${props.item.shipping_amount}</h3>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="wrapper-ship-bill">
                    <div className='shipping-address'>
                        <div>
                            <h3>Shipping Address</h3>
                        </div>
                        <div>
                            <h3>Guest POS</h3>
                            <h3>N/A, N/A, N/A, 00000, US</h3>
                        </div>
                    </div>
                    <div className='billing-address'>
                        <div>
                            <h3>Billing Address</h3>
                        </div>
                        <div>
                            <h3>Guest POS</h3>
                            <h3>N/A, N/A, N/A, 00000, US</h3>
                        </div>
                    </div>
                </div>




            </div> : <Empty style={{ marginTop: '40vh' }} />}
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        posInfo: state.staff.posInfo,
        customer: state.customer,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);