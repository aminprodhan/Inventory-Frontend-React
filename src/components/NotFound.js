import React,{ useState,useEffect }  from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter,Redirect } from "react-router-dom";
import {defaultRouteLink,getAccessTokenName,userLogout,isLoginExist} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';


 const NotFound=(props)=>{

    return(
        <div class="content container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Not Found</h1>
                </div>
            </div>
        </div>    
    )
 }
 export default NotFound;