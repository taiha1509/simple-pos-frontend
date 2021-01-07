import { actionType } from '../constants/index';


const INITIAL_STATE = {
    customer: {}
}

const customer = (state = INITIAL_STATE, action) => {
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
        case actionType.CHOOSE_CUSTOMER:
            return {
                ...state,
                chosenCustomer: action.payload,
            }

        case actionType.CHOOSE_GUEST:
            return {
                ...state,
                chosenCustomer: null
            }

        default:
            return state;
    }
}

export {
    customer,
}
