import { actionType } from '../constants/index';
const INITIAL_STATE = {
    staff: {}
}

const staff = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return {
                ...state,
                isLogin: false,
                isChooseLocation: false
            }

        case actionType.LOGOUT: {
            state = undefined;
            return {
                state
            }
        }

        case actionType.CHOOSE_LOCATION:
            return {
                ...state,
                isChooseLocation: true,
                posInfo: action.payload,
            }

        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                notification_message: 'login successfully',
                staff: action.payload
            }

        case actionType.LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                notification_message: 'login failure :(('
            }
        default:
            return state;

    }
}

export {
    staff
}