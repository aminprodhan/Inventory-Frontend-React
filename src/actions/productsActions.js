


import {getAccessTokenName, apiProductsInfo,apiSaveProduct,apiDeleteProduct,apiUpdateOrderStatus,apiUpdateProduct } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_MY_ORDER, SET_PRODUCTS_INFO,SET_PRODUCTS_SAVE_INFO} from './user_types';


export const updateOrderStatus=(item,statusId)=>{
    return async (dispatch,getState)=>{

        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;

        const data={
            orderId:item.id,
            statusId:statusId,
        }

        const apiLink=apiUpdateOrderStatus;
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
            throw new Error(JSON.stringify(resData.msg));
          
        dispatch({
            type:SET_MY_ORDER,
            data:resData,
        });

    }
}

export const deleteProductInfo=(data)=>{
    return async (dispatch,getState)=>{

        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;
        const itemInfo={
            item_id:data.id,
        }
        const apiLink=apiDeleteProduct;
        const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
             data:itemInfo,
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
            type:SET_PRODUCTS_SAVE_INFO,
            data:resData,
        });
    }
}
export const saveProductInfo=(data)=>{

    return async (dispatch,getState)=>{

        const sessionInfo=getCookieKeyInfo(getAccessTokenName);
        const tokenId=sessionInfo.token_id;

        let apiLink=apiSaveProduct;
        if(data.updateId > 0)
            apiLink=apiUpdateProduct;

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
      const apiLink=apiProductsInfo+"?tokenId="+sessionInfo.token_id;
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
