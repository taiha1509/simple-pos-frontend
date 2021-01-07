import { actionType } from '../constants/index';

const INITIAL_STATE = {
    products: [{
        qty: 0,
        item: null
    }],
    comment: '',
    customer: null,
    total_price: 0,
    staff: null,
}

const cart = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CART_UPDATE:{
            state = Object.assign({}, action.payload);
            return state;
        }
        case actionType.HOLD_CART:{
            state = Object.assign({}, INITIAL_STATE);
            return state;
        }
            
        default:
            return state;
    }
}

export {
    cart,
}