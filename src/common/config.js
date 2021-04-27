
import moment from "moment";

import { getCookieKeyInfo, setCookie, removeCookie } from "./CookieService";
import {SET_CURRENT_USER,SET_CURRENT_USER_EXIST,SET_CURRENT_USER_NOT_FOUND} from "../actions/user_types";


export function getCurrentDate(separator = "") {
    //let date= moment().format("DD-MM-YYYY hh:mm:ss");
    let date = moment().format("YYYY-MM-DD");
    return date;
}

export const serverUrl = "http://localhost:3000";
export const getApiServerLink=serverUrl+"/Inventory-Backend/src";
export const getApiServerLinkDataApi = getApiServerLink+"api/";
export const getApiServerDashboard =getApiServerLink+"admin_dashboard/";
export const defaultRouteLink = "/";
export const defaultAdminRouteLink = "/admin/";
export const defaultAdminDashBoardRouteLink = "/admin/dashboard";

export const try_login=getApiServerLink+"/controller/api/AuthLogin.php";
export const apiValidLogin=getApiServerLink+"/controller/api/admin/AdminAuth.php";
export const apiProductsInfo=getApiServerLink+"/controller/api/Products.php";
export const apiSaveProduct=getApiServerLink+"/controller/api/admin/ProductCreate.php";
export const apiUpdateProduct=getApiServerLink+"/controller/api/admin/ProductUpdate.php";
export const apiDeleteProduct=getApiServerLink+"/controller/api/admin/ProductDelete.php";
export const apiUpdateOrderStatus=getApiServerLink+"/controller/api/admin/ChangeOrderStatus.php";

export const apiCustomerHomePage=getApiServerLink+"/controller/api/customers/Products.php";
export const apiMakeOrder=getApiServerLink+"/controller/api/customers/OrdersController.php";
export const apiMyOrder=getApiServerLink+"/controller/api/Orders.php";

export const getAccessTokenName = "uinfo";
export const getAccessTokenNameInfo = "userInfo";
export const getAccessAdminTokenName = "uinfo_admin";


export const GetStatusColor=(status)=>{
    const colors=["","text-primary","text-success","text-warning","text-danger"];
    return colors[status];
}

export const userLogout = props => {
    removeCookie(getAccessTokenName);
    props.history.push(defaultRouteLink + "/admin_login");
};
export const resetSession = (callback) => {
    removeCookie(getAccessTokenName);
    callback(1);
};
export const isLoginExist = (props, key) => {
    let isLoginExit = getCookieKeyInfo(key);
    if (typeof isLoginExit != "undefined" && isLoginExit != null)
        props.history.push(defaultRouteLink + "/admin_dashboard");
    else props.history.push(defaultRouteLink + "/admin_login");
};
export const dispatchLoginAction = info => {
    return {
        type: SET_CURRENT_USER,
        user: info
    };
};
