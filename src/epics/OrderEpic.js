import { ofType } from 'redux-observable';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { actionType } from '../constants/index';
import { fetOrderFulfiled, fetchOrder, placeorderFulfiled } from '../actions/OrderAction';


const fetchOrderEpic = (action$, state$) => action$.pipe(
    ofType(actionType.FETCH_ORDER),
    mergeMap(async action => {
        let result = {};
        await fetch(`http://127.0.0.1/magento/rest/V1/api/orders/getOrder/` + action.payload.id, {
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


const placeorder = (action$, state$) => action$.pipe(
    ofType(actionType.PLACEORDER),
    mergeMap(async (action) => {
        debugger
        let result = {};
        const pos_id = state$.value.staff.posInfo.id;
        let bodyData = getOrderInfo(action.payload, pos_id);
        await fetch(`http://127.0.0.1/magento/rest/V1/api/orders/createOrder`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            mode: "cors",
            body: JSON.stringify(bodyData)
        }).then(response => response.json())
            .then(data => { result = data });

        // return fetchOrder({
        //     id: pos_id
        // });

        console.log(result);

        return placeorderFulfiled();

    })
);


const getOrderInfo = (cart, pos_id) => {
    let initial_result = {
        "data": {
            "currency_id": "USD",
            "email": "rogers@trueplus.vn",
            "shipping_address": {
                "firstname": "jhon",
                "lastname": "Deo",
                "street": "xxxx",
                "city": "xxxxx",
                "country_id": "US",
                "region": "Idaho",
                "postcode": "43244",
                "region_id": "1",
                "telephone": "52332",
                "fax": "32423",
                "save_in_address_book": 1
            },
            "items": [
                {
                    "product_id": "4",
                    "qty": 1,
                    "price": 34
                }
            ]
        },
        "pos_id": pos_id
    }

    cart.products.forEach(element => {
        initial_result.data.items.push({
            "product_id": element.item.id,
            "qty": element.qty,
            "price": element.item.price * element.qty
        });

    });

    if (cart.customer) {
        initial_result.data.email = cart.customer.email;
        initial_result.data.shipping_address.firstname = cart.customer.firstname;
        initial_result.data.shipping_address.lastname = cart.customer.lastname;
        if (cart.customer.addresses.length > 0) {
            // address = cart.customer.addresses[0];
            initial_result = {
                ...initial_result,
                shipping_address: {
                    "firstname": cart.customer.firstname,
                    "lastname": cart.customer.lastname,
                    "street": cart.customer.addresses[0].street[0],
                    "city": cart.customer.addresses[0].city,
                    "country_id": cart.customer.addresses[0].country_id,
                    "region": cart.customer.addresses[0].region,
                    "postcode": cart.customer.addresses[0].postcode,
                    "region_id": cart.customer.addresses[0].region_id,
                    "telephone": cart.customer.addresses[0].telephone,
                    "fax": "32423",
                    "save_in_address_book": 1
                }
            }
        }
    }

    return initial_result;
}

export {
    fetchOrderEpic,
    placeorder
}