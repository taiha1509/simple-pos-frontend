import {actionType} from '../constants/index';

const fetchOrder = (payload) => ({
    type: actionType.FETCH_ORDER,
    payload: payload
});

const fetOrderFulfiled = (payload) => ({
    type: actionType.FETCH_ORDER_FULFILED,
    payload: payload
});


export{
    fetchOrder,
    fetOrderFulfiled
}