import {actionType} from '../constants/index';

const fetchOrder = (payload) => ({
    type: actionType.FETCH_ORDER,
    payload: payload
});

const fetOrderFulfiled = (payload) => ({
    type: actionType.FETCH_ORDER_FULFILED,
    payload: payload
});

const placeorder = (payload) => ({
    type: actionType.PLACEORDER,
    payload: payload
})

const placeorderFulfiled = () => ({
    type: actionType.PLACEORDER_FULFILED
})

export{
    fetchOrder,
    fetOrderFulfiled,
    placeorder,
    placeorderFulfiled
}