
import moment from "moment";

import { getCookieKeyInfo, setCookie, removeCookie } from "./CookieService";
import {SET_CURRENT_USER,SET_CURRENT_USER_EXIST,SET_CURRENT_USER_NOT_FOUND} from "../actions/user_types";


export function getCurrentDate(separator = "") {
    //let date= moment().format("DD-MM-YYYY hh:mm:ss");
    let date = moment().format("YYYY-MM-DD");
    return date;
}


export const getApiServerLink="http://localhost:8080/Inventory-Backend/src/";

export const getApiServerLinkDataApi = getApiServerLink+"api/";
export const getApiServerDashboard =getApiServerLink+"admin_dashboard/";
export const defaultRouteLink = "";

export const try_login="Inventory-Backend/src/controller/api/AuthLogin.php";
export const apiProductsInfo="Inventory-Backend/src/controller/api/Products.php";
export const apiSaveProduct="Inventory-Backend/src/controller/api/admin/ProductCreate.php";
export const apiDeleteProduct="Inventory-Backend/src/controller/api/admin/ProductDelete.php";


export const apiCustomerHomePage="Inventory-Backend/src/controller/api/customers/Products.php";
export const apiMakeOrder="Inventory-Backend/src/controller/api/customers/OrdersController.php";


export const getAccessTokenName = "uinfo";
export const getAccessTokenNameInfo = "userInfo";


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
