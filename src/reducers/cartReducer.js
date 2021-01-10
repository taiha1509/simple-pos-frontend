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
    processingPlaceorder: false
}

const cart = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CART_UPDATE:{
            state = Object.assign({}, action.payload);
            return state;
        }
        case actionType.HOLD_CART:{
            // state = Object.assign({}, INITIAL_STATE);
            return {
                ...state,
                products: [{
                    qty: 0,
                    item: null
                }],
                comment: '',
                total_price: 0
            };
        }

        case actionType.PLACEORDER:
            return {
                ...state,
                products: [{
                    qty: 0,
                    item: null
                }],
                comment: '',
                total_price: 0,
                processingPlaceorder: true
            }

        case actionType.PLACEORDER_FULFILED:
            return {
                ...state,
                processingPlaceorder: false
            }

            
        default:
            return state;
    }
}

export {
    cart,
}