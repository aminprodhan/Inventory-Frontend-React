
import {getAccessTokenName,apiCustomerHomePage,apiMakeOrder,apiMyOrder} from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_CUSTOMER_DATA,SET_MAKE_ORDER,SET_MY_ORDER} from './user_types';
import axios from 'axios';    



export const getMyOrder=(i)=>{
    return async (dispatch,getState)=>{
        
        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;
        const apiLink=apiMyOrder+"?tokenId="+tokenId;
        const response = await fetch(apiLink);
        if(!response.ok){
                throw new Error('Something went wrong..')
        }
        const resData=await response.json();
        if(resData.status == 0 || typeof resData.status == 'undefined')
            throw new Error(resData.msg);
            
            
        dispatch({
            type:SET_MY_ORDER,
            data:resData,
        });
    }
}

export const makeOrder=(item,qty)=>{
    return async (dispatch,getState)=>{
        
        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;
        const data={
            item:item,qty:qty
        }
        const apiLink=apiMakeOrder;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                data:data,
                tokenId:tokenId,
            })
        };
        
        const response = await fetch(apiLink,requestOptions);
        if(!response.ok){
                throw new Error('Something went wrong..')
        }
        const resData=await response.json();
        if(resData.status == 0 || typeof resData.status == 'undefined')
            throw new Error(resData.msg);
            
        dispatch({
            type:SET_MAKE_ORDER,
            data:resData,
        });
    }
}

export const getCustomerProductsInfo=()=>{

    return async (dispatch,getState)=>{

      const sessionInfo=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiCustomerHomePage+"?tokenId="+sessionInfo.token_id;
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);

      dispatch({
          type:SET_CUSTOMER_DATA,
          data:resData,
      });

    }
}

