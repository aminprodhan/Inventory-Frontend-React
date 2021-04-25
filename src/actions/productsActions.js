


import {getAccessTokenName, apiProductsInfo } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_PRODUCTS_INFO} from './user_types';

export const saveProductInfo=(data)=>{

    return async (dispatch,getState)=>{

        const apiLink=try_login;
        const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
             reqData:data,
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
export const getProductsInfo=()=>{

    return async (dispatch,getState)=>{

      const sessionInfo=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiProductsInfo+"?token_id="+sessionInfo.token_id;
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);
      dispatch({
          type:SET_PRODUCTS_INFO,
          data:resData,
      });

    }
}
