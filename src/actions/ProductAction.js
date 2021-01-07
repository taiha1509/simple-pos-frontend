import { actionType } from '../constants/index'

const fetchProduct = (filter = null, currentPage = 0, pageSize = 1000) => ({
    type: actionType.FETCH_PRODUCT,
    payload: {
        url: 'searchCriteria[filter_groups][0][filters][0][field]=entity_id&searchCriteria[filter_groups][0][filters][0][value]=10000' +
        '&searchCriteria[filter_groups][0][filters][0][condition_type]=neq&searchCriteria[pageSize]='+ pageSize + '&searchCriteria[currentPage]=' + currentPage
    }
})


const fetchProductFulfiled = (payload) => ({
    type: actionType.FETCH_PRODUCT_FULFILED,
    payload: payload
})

export {
    fetchProduct,
    fetchProductFulfiled
}