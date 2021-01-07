const actionType = {
    FETCH_PRODUCT: 'fecth_product',
    FETCH_PRODUCT_FULFILED: 'fetch_product_fulfiled',
    LOGIN: 'login',
    LOGOUT: 'logout',
    CHOOSE_LOCATION: 'staff choose a location',
    LOGIN_SUCCESS: 'staff was login successfully',
    LOGIN_FAILURE: 'staff login fail',
    FETCH_CUSTOMER: 'fetch_customer',
    FETCH_CUSTOMER_FULFILED: 'fetch_customer_fulfiled',
    FETCH_ORDER: 'fetch_order',
    FETCH_ORDER_FULFILED: 'fetch_order_fulfiled',
    CHOOSE_CUSTOMER: 'staff chooses a customer',
    CHOOSE_GUEST: 'sstaff chooses a guest',
    HOLD_CART: 'staff click cart hold button',
    CART_UPDATE: 'cart updated',
}



export {actionType};


export const BASE_IMG_URL = 'http://127.0.0.1/magento/pub/media/catalog/product';