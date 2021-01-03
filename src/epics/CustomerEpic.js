import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { actionType } from '../constants/index';
import { fetchCustomer, fetchCustomerFulfiled } from '../actions/CustomerAction';


const fetchCustomerEpic = (action$, state$) => action$.pipe(
    ofType(actionType.FETCH_CUSTOMER),
    mergeMap(async action => {
        let result = {};
        await fetch(`http://127.0.0.1/magento/rest/V1/api/customers/getCustomer`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': state$.value.staff.staff.staff.token,
                'Id': state$.value.staff.staff.staff.id
            }   
        }).then(response => response.json())
            .then(data => { result = data });
        return fetchCustomerFulfiled(result);

    })
);


export {
    fetchCustomerEpic,
}