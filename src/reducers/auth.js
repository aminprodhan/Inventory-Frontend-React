
import isEmpty from 'lodash/isEmpty';
import {SET_CURRENT_USER , SET_DRAWER_BOOLEAN} from '../actions/user_types';
const initialState = {
    isAuthenticated: false,
    isUserLogin: null,
    users:[],
    userRoleList:[],
    drawerOpen:true,
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
        case SET_CURRENT_USER:
            return {
                isAuthenticated: true,
                isUserLogin: action.user,
            };   
        default: return state;
    }


}
