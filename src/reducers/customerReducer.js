import { actionType } from '../constants/index';


const INITIAL_STATE = {
    customer: {},
    isLoadingCustomer: false,
    data: {
        items: [],
        search_criteria: {
            filter_groups: [],
        },
        total_count: 0,
    },
    chosenCustomer: {
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
