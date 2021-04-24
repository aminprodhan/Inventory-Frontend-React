
import isEmpty from 'lodash/isEmpty';
import {SET_CURRENT_USER , SET_DRAWER_BOOLEAN,SET_ADMIN_DATA} from '../actions/user_types';
const initialState = {
    products:[],
    categories:[],
    orders:[],
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
        case SET_ADMIN_DATA:
            return {
                ...state,
                orders: action.data.orders,
            };   
        default: return state;
    }
}