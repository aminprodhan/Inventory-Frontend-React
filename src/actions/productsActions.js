


import {getAccessTokenName, apiProductsInfo } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_PRODUCTS_INFO} from './user_types';

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
