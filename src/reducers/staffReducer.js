import { actionType } from '../constants/index';
const INITIAL_STATE = {
    staff: {
        status: 1,
        message: '',
        staff: {
            name: '',
            email: '',
            password: '',
            status: 1,
            token: '',
            id: 0
        },
        list_pos: [],
        code: 0,
    },
    isLogin: false,
    isChooseLocation: false,
    notification_message: '',
    posInfo: {
        id: 0,
        name: '',
        description: '',
        location: '',
        staus: 1,
    }
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