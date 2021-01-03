import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { actionType } from '../constants/index';
import {fetOrderFulfiled, fetchOrder} from '../actions/OrderAction';


const fetchOrderEpic = (action$, state$) => action$.pipe(
    ofType(actionType.FETCH_ORDER),
    mergeMap(async action => {
        let result = {};
        await fetch(`http://127.0.0.1/magento/rest/V1/api/orders/getOrder/`+ action.payload.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': state$.value.staff.staff.staff.token,
                'Id': state$.value.staff.staff.staff.id
            },
            mode: "cors"
        }).then(response => response.json())
            .then(data => { result = data });
        
        return fetOrderFulfiled(result);

    })
);


export {
    fetchOrderEpic,
}