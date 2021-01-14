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

const fetchAdditionalOrderInfo = (list_id) => ({
    type: actionType.ADDITIONAL_ORDER_INFO,
    payload: list_id,
})

const fetchAdditionalOrderInfoOk = (data) => ({
    type: actionType.ADDITIONAL_ORDER_INFO_OK,
    payload: data
})
export{
    fetchOrder,
    fetOrderFulfiled,
    placeorder,
    placeorderFulfiled,
    fetchAdditionalOrderInfo,
    fetchAdditionalOrderInfoOk
}