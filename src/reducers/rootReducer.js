import { combineReducers } from 'redux'

import {product} from './productReducer';
import {staff} from './staffReducer';
import {customer} from './customerReducer';
import {order} from './orderReducers';
import {cart} from './cartReducer';

const rootReducer = combineReducers({
    product,
    staff,
    customer,
    order,
    cart,
})

export default rootReducer