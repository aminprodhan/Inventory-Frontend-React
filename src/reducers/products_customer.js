
import isEmpty from 'lodash/isEmpty';
import {SET_CUSTOMER_DATA , SET_DRAWER_BOOLEAN,SET_ADMIN_DATA} from '../actions/user_types';
const initialState = {
    products:[],
    categories:[],
    orders:[],
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
        case SET_CUSTOMER_DATA:
            return {
                ...state,
                products: action.data.products,
                imgProductUrl: action.data.imgProductUrl,
            };   
        default: return state;
    }
}