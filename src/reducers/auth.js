
import isEmpty from 'lodash/isEmpty';
import {SET_REFRESH_STORETRANSECTION,
     SET_CURRENT_USER , SET_CURRENT_USER_EXIST,
     SET_CURRENT_USER_NOT_FOUND,SET_USERS_LIST,CREATE_USER, SET_DRAWER_BOOLEAN} from '../actions/user_types';
const initialState = {
    isAuthenticated: false,
    isUserLogin: {},
    userStatusType : {},
    invoicetransectionList:[],
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
                userStatusType : action.type
            };
        case SET_USERS_LIST:
            return {
                ...state,
                users : action.data,
                userRoleList:action.role_list,
            };
        case CREATE_USER:
            return {
                ...state,
                users : action.data,
            };    
        case SET_CURRENT_USER_EXIST:
            return {
                isAuthenticated: false,
                isUserLogin: action.user,
                userStatusType : action.type
            };
        case SET_CURRENT_USER_NOT_FOUND:
            return {
                isAuthenticated: false,
                isUserLogin: action.user,
                userStatusType : action.type
            };

            case SET_REFRESH_STORETRANSECTION:
                let tqty=0;
                 let toTal = 0;
                action.updateinvoiceTransection.map((item, index) => {
                    tqty=parseFloat(tqty) + parseFloat(item.quantity);
                    toTal=parseFloat(toTal) + parseFloat(item.quantity * item.price);
                });
                return {
                    ...state,
                    invoicetransectionList:action.updateinvoiceTransection,
                    tqty:tqty,
                    toTal:toTal,
                };
        default: return state;
    }


}
