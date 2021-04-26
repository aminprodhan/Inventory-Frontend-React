import React,{ useState,useEffect }  from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter,Redirect } from "react-router-dom";
import {defaultRouteLink,getApiServerLinkDataApi} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import CardDashboard from './admin/CardDashboard';
import {useDispatch,useSelector} from 'react-redux';
import * as productsCustomerAction from '../actions/productsCustomerAction';

 const Dashboard=(props)=>{
    const dispatch=useDispatch();
    const info=useSelector(state=>state.products_customer);
    //const isLoginExit=getCookieKeyInfo(getAccessTokenName);

    useEffect(() => {
        getMyOrder();
    },[]);
    const getMyOrder=async()=>{
        let info=productsCustomerAction.getMyOrder();
        try{
            await dispatch(info);
        }
        catch(err){}
    }
    
    return( 
        <div className="col-12">
            <div className="d-flex justify-content-left flex-wrap">
                <CardDashboard {...props} />
            </div>
        </div> 
    )
 }
 export default Dashboard;