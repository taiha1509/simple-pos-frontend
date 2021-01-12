import { actionType } from '../constants/index';

const INITIAL_STATE = {
    comment: "",
    total_price: 0,
    staff: null,
    processingPlaceorder: false,
    products: [{
        qty: 0,
        item: null
    }],
    customer: {
        id: 0,
        group_id: 0,
        default_billing: "",
        default_shipping: "",
        created_at: "",
        updated_at: "",
        created_in: "",
        email: "",
        firstname: "",
        lastname: "",
        store_id: "",
        website_id: 0,
        disable_auto_group_change: 0,
        addresses: []
    }
}

const cart = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case actionType.CART_UPDATE: {
                state = Object.assign({}, action.payload);
                return state;
            }
            case actionType.HOLD_CART: {
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