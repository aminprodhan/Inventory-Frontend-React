
import {getAccessTokenName,apiCustomerHomePage} from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_CUSTOMER_DATA} from './user_types';
import axios from 'axios';    

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

