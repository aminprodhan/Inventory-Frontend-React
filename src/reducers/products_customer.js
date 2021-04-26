
import isEmpty from 'lodash/isEmpty';
import {SET_CUSTOMER_DATA , SET_DRAWER_BOOLEAN,SET_MY_ORDER} from '../actions/user_types';
const initialState = {
    products:[],
    categories:[],
    orders:[],
    orderStatuses:[],
    orders_today:[],
    orderByStatus:[],
    imgProductUrl:'',
}
export default (state = initialState, action = {}) =>
{
    switch(action.type)
    {
        case SET_DRAWER_BOOLEAN:
            return{
                ...state,
                drawerOpen:action.value,
            }
        case SET_MY_ORDER:
            return{
                ...state,
                orders:action.data.orders,
                orderStatuses:action.data.orderStatuses,
                orders_today:action.data.orders_today,
                orderByStatus:action.data.orderByStatus,
                
            }    
        case SET_CUSTOMER_DATA:
            return {
                ...state,
                products: action.data.products,
                imgProductUrl: action.data.imgProductUrl,
                orders:action.data.orders,
                
            };   
        default: return state;
    }
}