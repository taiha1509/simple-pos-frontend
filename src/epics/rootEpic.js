import { combineEpics } from 'redux-observable';
import { staff } from '../reducers/staffReducer';

import {fetchProductEpic} from './ProductEpic';
import {staffLogin} from './StaffEpic';
import {fetchOrderEpic, placeorder, fetchAdditionalInfoEpic, fetchAdditionalInfoEpicFulfiled} from './OrderEpic';
import {fetchCustomerEpic} from './CustomerEpic';

const rootEpic = combineEpics(
    fetchProductEpic,
    staffLogin,
    fetchOrderEpic,
    fetchCustomerEpic,
    placeorder,
    fetchAdditionalInfoEpicFulfiled,
    fetchAdditionalInfoEpic,
);

export default rootEpic;