import { combineEpics } from 'redux-observable';
import { staff } from '../reducers/staffReducer';

import {fetchProductEpic} from './ProductEpic';
import {staffLogin} from './StaffEpic';
import {fetchOrderEpic} from './OrderEpic';
import {fetchCustomerEpic} from './CustomerEpic';

const rootEpic = combineEpics(
    fetchProductEpic,
    staffLogin,
    fetchOrderEpic,
    fetchCustomerEpic
);

export default rootEpic;