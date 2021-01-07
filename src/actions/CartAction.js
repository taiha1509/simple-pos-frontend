import {actionType} from '../constants/index';

const holdCart = () => ({
    type: actionType.HOLD_CART,
})

const cartUpdate = (payload) => ({
    type: actionType.CART_UPDATE,
    payload: payload
})

export {
    holdCart,
    cartUpdate,
}