
import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import {defaultRouteLink} from '../common/config';
import {userLogout,isLoginExist,resetSession} from "../common/config";
import NavCustomer from './customer/NavCustomer';

const HeaderCustomer=props=>{
   
    return(
        <div className="main-wrapper slide-nav" style={{backgroundColor:'#fff'}}>
            <NavCustomer {...props} /> 
        </div>
    )
}
export default compose(withRouter, connect(null, null))(HeaderCustomer);
