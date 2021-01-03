import {ofType} from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { actionType } from '../constants/index';
import { fetchProduct, fetchProductFulfiled } from '../actions/ProductAction';


const fetchProductEpic = (action$, state$) => action$.pipe(
    ofType(actionType.FETCH_PRODUCT),
    mergeMap(async action => {
        let result = {};
        await fetch(`http://127.0.0.1/magento/rest/V1/api/products/getProduct?`+ action.payload.url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': state$.value.staff.staff.staff.token,
                'Id': state$.value.staff.staff.staff.id
            },
            mode: "cors"
        }).then(response => response.json())
            .then(data => { result = data });
        return fetchProductFulfiled(result);

    })
);


export {
    fetchProductEpic,
}