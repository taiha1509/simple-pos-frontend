import { actionType } from '../constants/index';

const INITIAL_STATE = {
    product: {}
}

const product = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCT:
            return {
                ...state,
                isLoadingProduct: true,
            }

        case actionType.FETCH_PRODUCT_FULFILED:
            return {
                ...state,
                isLoadingProduct: false,
                data: action.payload
            }

        default: 
            return state;
    }
}

export{
    product,

}