import { actionType } from '../constants/index';


const INITIAL_STATE = {
    
}

const customer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.FETCH_CUSTOMER:
            return {
                ...state,
                isLoadingCustomer: true
            }

        case actionType.FETCH_CUSTOMER_FULFILED:
            return {
                ...state,
                isLoadingCustomer: false,
                data: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export {
    customer,
}