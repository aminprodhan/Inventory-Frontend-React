


import {getAccessTokenName, apiProductsInfo,apiSaveProduct,apiDeleteProduct } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_PRODUCTS_INFO,SET_PRODUCTS_SAVE_INFO} from './user_types';

export const deleteProductInfo=(data)=>{
    return async (dispatch,getState)=>{

        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;

        const apiLink=apiDeleteProduct;
        const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
             reqData:data,
             tokenId:tokenId,
          })
       };
    
        const response = await fetch(apiLink,requestOptions);
        if(!response.ok){
              throw new Error('Something went wrong..')
        }
        const resData=await response.json();
        if(resData.status == 0 || typeof resData.status == 'undefined')
             {
                //console.log(JSON.stringify(resData.errors));
                 throw new Error(JSON.stringify(resData.errors));
             }
        dispatch({
            type:SET_PRODUCTS_SAVE_INFO,
            data:resData,
        });
    }
}
export const saveProductInfo=(data)=>{

    return async (dispatch,getState)=>{

        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;

        const apiLink=apiSaveProduct;
        const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
             reqData:data,
             tokenId:tokenId,
          })
       };
    
        const response = await fetch(apiLink,requestOptions);
        if(!response.ok){
              throw new Error('Something went wrong..')
        }
        const resData=await response.json();
        if(resData.status == 0 || typeof resData.status == 'undefined')
             {
                //console.log(JSON.stringify(resData.errors));
                 throw new Error(JSON.stringify(resData.errors));
             }
        dispatch({
            type:SET_PRODUCTS_SAVE_INFO,
            data:resData,
        });
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
