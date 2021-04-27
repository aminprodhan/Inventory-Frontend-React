import React,{useRef,useState,useEffect}  from 'react';

import ImgLogo from '../assets/images/logo2.png';

import axios from 'axios';
import {getApiServerLinkDataApi,getAccessTokenName,getApiServerDashboard} from '../common/config';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';
import {defaultRouteLink,dispatchLoginAction} from '../common/config';
import { connect } from 'react-redux';
import {useDispatch,useSelector} from 'react-redux';
import {withRouter,Redirect } from "react-router-dom";
import * as authAction from '../actions/authActions';


const ExpiresAt=60 * 24;
const LoginPage=(props)=>{
    
    const userDefaultData={
        user_signin_name:'',
        user_signin_password:'',
        errors:"",
        isChecked:false,
        isBtnClick:false,
    }
    const dispatch=useDispatch();
    const [userInfo,setUserInfo]=useState(userDefaultData);
    const [signButtonDisabled,setSignButtonDisabled]=useState(false);
    const [show, setShow] = useState(true);

    const isLoginExit=getCookieKeyInfo(getAccessTokenName);

    useEffect(() => {
        if(props.is_login)
           {
                if(isLoginExit.role_id == '1')
                    window.location=defaultRouteLink+"/admin_dashboard";
                else
                    window.location=defaultRouteLink+'/dashboard';
           } 

    },[isLoginExit]);
    
    const handleCheck=()=>{
        setUserInfo({
            ...userInfo,
            "isChecked":!userInfo.isChecked,
        });
    }
    const onChange=(e)=>{
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value,
        });
    }
    const isValidSignIn=async(e)=>{

        e.preventDefault();

        setUserInfo({
            ...userInfo,
            "isBtnClick":true,

        });
        setSignButtonDisabled(true);
        let info=authAction.login(userInfo);
        try{
            await dispatch(info);
        }
        catch(err){

            setShow(true);
            setUserInfo({
                ...userInfo,
                "errors":err.message,
                "isBtnClick":false,
            });
            setSignButtonDisabled(false);
        }

    }
    return(
        <div className="account-page">
            <div className="container d-flex h-100">
                <div className="account-box justify-content-center align-self-center">
                    <div className="account-logo">
                        <a href="/"><img src={ImgLogo} alt="Preadmin" /></a>
                    </div>
                    <h3 className="account-title">User Login</h3>
                    <div className="account-wrapper">
                        <form className="form-signin">
                            {
                                (userInfo.errors.length > 0 && show) ? (
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                        <Alert.Heading>{userInfo.errors}</Alert.Heading>
                                    </Alert>
                                ) : (<span></span>)
                            }
                            <div className="form-group form-focus">
                                <label className="control-label">User Name</label>
                                <input onChange={onChange} name="user_signin_name" value={userInfo.user_signin_name} className="form-control floating" type="text"/>
                            </div>
                            <div className="form-group form-focus">
                                <label className="control-label">Password</label>
                                <input onChange={onChange} name="user_signin_password" value={userInfo.user_signin_password} className="form-control floating" type="password"/>
                            </div>
                            <div className="form-group text-left">
                                <input onChange={handleCheck} defaultChecked={userInfo.isChecked} type="checkbox" name="rem_me" /> Remember Me
                            </div>
                            <div className="form-group text-center">
                                <Button  type="button"  onClick={isValidSignIn}
                                    className="col-12" variant="contained"
                                    color="secondary" disabled={signButtonDisabled}>
                                        {
                                            (userInfo.isBtnClick) ? "Loading" : "Login"
                                        }
                                    </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return{
        is_login: state.auth.isAuthenticated,
    }
}
export default connect(mapStateToProps,null)(LoginPage)
