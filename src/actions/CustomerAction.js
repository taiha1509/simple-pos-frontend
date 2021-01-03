import {actionType} from '../constants/index';

const fetchCustomer = () => ({
    type: actionType.FETCH_CUSTOMER
})

const fetchCustomerFulfiled = (payload) => ({
    type: actionType.FETCH_CUSTOMER_FULFILED,
    payload: payload
})

export {
    fetchCustomer,
    fetchCustomerFulfiled
}