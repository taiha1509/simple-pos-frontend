import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { actionType } from '../constants/index';
import { login, loginSuccessfully, loginFail } from '../actions/StaffAction';
import { ajax } from "rxjs/ajax";
import { dispatch } from 'rxjs/internal/observable/pairs';


const staffLogin = (action$, state$) => action$.pipe(
    ofType(actionType.LOGIN),
    mergeMap(async action => {
        let result = {};
        await fetch(`http://127.0.0.1/magento/rest/V1/api/security/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data:
                {
                    email: action.payload.email,
                    password: action.payload.password
                }
            }),
            mode: "cors"
        }).then(response => response.json())
            .then(data => { result = data });
        if (result.code == 200) {
            return loginSuccessfully(result);
        } else {
            return loginFail(result);
        }

    })
);




export {
    staffLogin,
}