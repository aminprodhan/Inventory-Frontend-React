import { createNewUser, getAccessTokenName,apiGetUsers,try_login,apiValidLogin } from '../common/config';
import { SET_CURRENT_USER} from './user_types';
import {defaultRouteLink,dispatchLoginAction} from '../common/config';
import {getCookieKeyInfo,setCookie,removeCookie} from '../common/CookieService';

export const ExpiresAt=60 * 24;

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user:user,
  };
}

export function checkValidUser(type,msg) {
  return {
    type: type,
    user:msg,
  };
}

export function loginAdmin(data) {

  return async (dispatch)=>{

    const apiLink=apiValidLogin;
    const apiData={
        username:data.user_signin_name,
        password:data.user_signin_password,
    }
    const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ 
         data:apiData,
      })
   };
    const response = await fetch(apiLink,requestOptions);
    if(!response.ok){
          throw new Error('Something went wrong..')
    }
    const resData=await response.json();
    if(resData.status == 0 || typeof resData.status == 'undefined')
         throw new Error(resData.msg);

        if(!data.isChecked)
        {
            setCookie("uinfo",resData.uinfo);
        }
        else{

            let date=new Date();
            date.setTime(date.getTime() + (ExpiresAt * 60 * 1000));
            let options={
                path:'/',expires :date,
            }
            setCookie("uinfo",resData.uinfo,options);
        }     
        dispatch(dispatchLoginAction(resData.uinfo));
 }

}
export function login(data) {

  return async (dispatch)=>{

    const apiLink=try_login;
    const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ 
         reqData:data,
          // username:data.user_signin_name,
          // password:data.user_signin_password,
      })
   };

    const response = await fetch(apiLink,requestOptions);
    if(!response.ok){
          throw new Error('Something went wrong..')
    }
    const resData=await response.json();
    if(resData.status == 0 || typeof resData.status == 'undefined')
         throw new Error(resData.msg);

        if(!data.isChecked)
        {
            setCookie("uinfo",resData.uinfo);
        }
        else{

            let date=new Date();
            date.setTime(date.getTime() + (ExpiresAt * 60 * 1000));
            let options={
                path:'/',expires :date,
            }
            setCookie("uinfo",resData.uinfo,options);

        }     
        dispatch(dispatchLoginAction(resData.uinfo));

 }

}
