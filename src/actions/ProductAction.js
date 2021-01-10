import { actionType } from '../constants/index'
import { logicType } from '../constants/index'

const fetchProduct = (filter = null, currentPage = 0, pageSize = 1000) => {
    let url = '';
    let index_and = 0;
    let index_or = 0;

    
    if (filter) {
        url += 'searchCriteria[filter_groups][0][filters][0][field]=entity_id' +
            '&searchCriteria[filter_groups][0][filters][0][value]=10000' +
            '&searchCriteria[filter_groups][0][filters][0][condition_type]=neq';
        if (filter.length > 0) {

            filter.forEach((element, index) => {
                if (element.logic == logicType.OR) {
                    index_or++;
                }
    
                if (element.logic == logicType.AND) {
                    index_and++;
                }

                url += '&searchCriteria[filter_groups][' + index_and + '][filters][' + index_or + '][field]=' + element.field;
                url += '&searchCriteria[filter_groups][' + index_and + '][filters][' + index_or + '][value]=' + element.value;
                url += '&searchCriteria[filter_groups][' + index_and + '][filters][' + index_or + '][condition_type]=' + element.condition_type;
            });
        }
        url += '&searchCriteria[pageSize]=' + pageSize + '&searchCriteria[currentPage]=' + currentPage;
    }

    else {
        url = 'searchCriteria[filter_groups][0][filters][0][field]=entity_id' +
            '&searchCriteria[filter_groups][0][filters][0][value]=10000' +
            '&searchCriteria[filter_groups][0][filters][0][condition_type]=neq' +
            '&searchCriteria[pageSize]=' + pageSize + '&searchCriteria[currentPage]=' + currentPage
    }
    return {
        type: actionType.FETCH_PRODUCT,
        payload: {
            url: url
        }
    }
}


const fetchProductFulfiled = (payload) => ({
    type: actionType.FETCH_PRODUCT_FULFILED,
    payload: payload
})

export {
    fetchProduct,
    fetchProductFulfiled
}