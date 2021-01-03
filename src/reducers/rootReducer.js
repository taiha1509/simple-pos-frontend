import { combineReducers } from 'redux'

import {product} from './productReducer';
import {staff} from './staffReducer';
import {customer} from './customerReducer';
import {order} from './orderReducers';

const rootReducer = combineReducers({
    product,
    staff,
    customer,
    order,
})

export default rootReducer