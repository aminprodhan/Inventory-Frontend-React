import React, { useEffect } from "react";
import {
    BrowserRouter,
    useParams,
    Route,
    Switch,
    IndexRoute
} from "react-router-dom";
import LoginPage from "./components/Login";
import Header from "./components/Header";
import HeaderCustomer from "./components/HeaderCustomer";
import Dashboard from "./components/Dashboard";
import Products from "./components/customer/Products";
import ManageProducts from "./components/admin/products/ManageProducts";


import { connect } from "react-redux";
import {
    defaultRouteLink,
    getAccessTokenName,
    userLogout,
    isLoginExist
} from "./common/config";
import {
    getCookieKeyInfo,
    setCookie,
    removeCookie
} from "./common/CookieService";
import {useDispatch,useSelector} from 'react-redux';


export const Routes = props => {
    const dispatch=useDispatch();
    let isLoginExit = getCookieKeyInfo(getAccessTokenName);

    useEffect(() => {
        isLoginExit = getCookieKeyInfo(getAccessTokenName);
    }, [dispatch]);

    //console.log("props data="+isLoginExit);

    return (
        <Switch>
            <Route
                exact
                path={defaultRouteLink + "/admin_login"}
                component={LoginPage}
            />
            <Route
                exact
                path="*"
                render={() =>
                    isLoginExit && typeof isLoginExit != 'undefined' ? (
                        (isLoginExit.role_id == 1) ? (
                            <Header>
                                <Route
                                    exact
                                    path={defaultRouteLink + "/admin_dashboard"}
                                    component={Dashboard}
                                />    
                                <Route
                                    exact
                                    path={defaultRouteLink + "/manage-products"}
                                    component={ManageProducts}
                                /> 
                                
                            </Header>
                        ) : (
                            <HeaderCustomer>
                                <Route
                                    exact
                                    path={defaultRouteLink + "/dashboard"}
                                    component={Products}
                                />    
                            </HeaderCustomer>
                        )
                        
                    ) : (
                        <Route component={LoginPage} />
                    )
                }
            />
        </Switch>
    );
};
const mapStateToProps = state => {
    return {
        is_login: state.auth.isAuthenticated
    };
};
export default connect(mapStateToProps, null)(Routes);
