
import { actionType } from '../constants/index'


const INITIAL_STATE = {
    order: {},
    isLoadingOrder:false,
    data: {
        items: [],
        search_criteria:{
            filter_groups:[],
        },
        total_count: 0
    }
}


const order = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.FETCH_ORDER:
            return {
                ...state,
                isLoadingOrder: true
            }

        case actionType.FETCH_ORDER_FULFILED:
            return {
                ...state,
                isLoadingOrder: false,
                data: action.payload
            }
        default:
            return state;
    }
}


export {
    order,
}