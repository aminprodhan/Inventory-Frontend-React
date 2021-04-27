import React,{useRef,useState,useEffect}  from 'react';
import axios from 'axios';
import {getApiServerLinkDataApi,getAccessTokenName,getApiServerDashboard} from '../../common/config';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert';
import {getCookieKeyInfo,setCookie,removeCookie} from '../../common/CookieService';
import {dispatchLoginAction,defaultAdminDashBoardRouteLink} from '../../common/config';
import { connect } from 'react-redux';
import {useDispatch,useSelector} from 'react-redux';
import {withRouter,Redirect } from "react-router-dom";
import * as authAction from '../../actions/authActions';
import { useLocation } from 'react-router-dom'

const AdminLogin=(props)=>{
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
    const location = useLocation();

    useEffect(() => {
        if(isLoginExit && typeof isLoginExit != 'undefined'){
            if(location.pathname == '/admin/login'){
                //window.location=defaultAdminDashBoardRouteLink;
            }
        }
    },[dispatch]);
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
        let info=authAction.loginAdmin(userInfo);
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
                    <h3 className="account-title">Admin Login</h3>
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
export default AdminLogin;