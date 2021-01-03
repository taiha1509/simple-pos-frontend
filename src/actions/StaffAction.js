import {actionType} from '../constants/index';

const login = (payload) => ({
    type: actionType.LOGIN,
    payload: payload
});

const logout = () => ({
    type: actionType.LOGOUT
})

const chooseLocation = (payload) => ({
    type: actionType.CHOOSE_LOCATION,
    payload: payload
});

const loginSuccessfully = (staff) => ({
    type: actionType.LOGIN_SUCCESS,
    payload: staff
})

const loginFail = (resoponse) => ({
    type: actionType.LOGIN_FAILURE,
    payload: {
        resoponse: resoponse
    }
})


export {
    login,
    logout,
    chooseLocation,
    loginSuccessfully,
    loginFail
}