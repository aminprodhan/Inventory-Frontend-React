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
import Dashboard from "./components/Dashboard";
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


export const Routes = props => {
    let isLoginExit = getCookieKeyInfo(getAccessTokenName);
    useEffect(() => {
        isLoginExit = getCookieKeyInfo(getAccessTokenName);
    }, [props]);

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
                    isLoginExit ? (
                        <Header>
                            <Route
                                exact
                                path={defaultRouteLink + "/admin_dashboard"}
                                component={Dashboard}
                            />    
                        </Header>
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
