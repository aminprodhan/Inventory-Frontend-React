import React,{ useState,useEffect }  from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter,Redirect } from "react-router-dom";
import {defaultRouteLink,getApiServerLinkDataApi} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

 const Dashboard=(props)=>{
    const [countOrderStatus,setCountOrderStatus]=useState([]);
    const [isNewOrder,setIsNewOrder]=useState(false);



    useEffect(()=>{
       // fetchOrderStatusInfo();
    },[]);
    let newOrder=(isNewOrder) ? (
        <Alert variant="success">
            <Alert.Heading>New order is placed</Alert.Heading>
        </Alert>
    ) : (<span></span>)
    return( 
        <> 
            <div className="p-4">
                <h1>Testing</h1>
            </div>
        </>
    )
 }
 export default Dashboard;