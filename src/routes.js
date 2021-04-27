import React, { useEffect } from "react";
import {
    BrowserRouter,
    useParams,
    Route,
    Switch,
    IndexRoute
} from "react-router-dom";
import LoginPage from "./components/Login";
import AdminLogin from "./components/admin/AdminLogin";
import Header from "./components/Header";
import HeaderCustomer from "./components/HeaderCustomer";
import Dashboard from "./components/Dashboard";
import Products from "./components/customer/Products";
import ManageProducts from "./components/admin/products/ManageProducts";
import { useLocation } from 'react-router-dom'
import { withRouter,Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {defaultRouteLink,defaultAdminRouteLink,getAccessTokenName,defaultAdminDashBoardRouteLink
} from "./common/config";
import {
    getCookieKeyInfo} from "./common/CookieService";
import {useDispatch,useSelector} from 'react-redux';
import MyOrder from "./components/MyOrder";


export const Routes = props => {
    const dispatch=useDispatch();
    let isLoginExit = getCookieKeyInfo(getAccessTokenName);
    const location = useLocation();
    return (
        <Switch>
            
            <Route
                exact
                path="*"
                render={() =>
                    isLoginExit && typeof isLoginExit != 'undefined' ? (
                        (isLoginExit.role_id == 1) ? (
                            <Header>
                                <Route
                                    exact
                                    path={defaultAdminRouteLink + "login"}
                                    render = {() => <Redirect to={defaultAdminDashBoardRouteLink} />}
                                />
                                <Route
                                    
                                    path={defaultAdminDashBoardRouteLink}
                                    component={Dashboard}
                                />

                                <Route   
                                    path={defaultAdminRouteLink + "manage-products"}
                                    component={ManageProducts}
                                />
                                <Route   
                                    path={defaultAdminRouteLink + "my-order"}
                                    component={MyOrder}
                                />
                            </Header>
                        ) : (
                            <HeaderCustomer>
                                <Route
                                    exact
                                    path={"/"}
                                    component={Products}
                                /> 
                                <Route
                                    exact
                                    path={defaultRouteLink + "my-order"}
                                    component={MyOrder}
                                />    
                            </HeaderCustomer>
                        )
                        
                    ) : (
                        <>
                            <Route 
                                exact
                                path={"/"}
                                component={LoginPage} />
                            <Route 
                                exact
                                path={defaultAdminRouteLink + "login"}
                                component={AdminLogin} />
                        </> 
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
