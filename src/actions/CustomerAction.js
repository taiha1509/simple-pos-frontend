import {actionType} from '../constants/index';

const fetchCustomer = () => ({
    type: actionType.FETCH_CUSTOMER
})

const fetchCustomerFulfiled = (payload) => ({
    type: actionType.FETCH_CUSTOMER_FULFILED,
    payload: payload
})

const chooseCustomer = (customer) => ({
    type: actionType.CHOOSE_CUSTOMER,
    payload: customer
})

const chooseGuest = () => ({
    type: actionType.CHOOSE_GUEST,
})

export {
    fetchCustomer,
    fetchCustomerFulfiled,
    chooseCustomer,
    chooseGuest
}