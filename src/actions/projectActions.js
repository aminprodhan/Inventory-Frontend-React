


import {getAccessTokenName, apiProjectsInfo,apiProjectCreate } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SET_PROJECTS_INFO} from './user_types';

export const getProjectsInfo=()=>{

    return async (dispatch,getState)=>{

      const tokenId=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiProjectsInfo+"?tokenId="+tokenId;
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);
      dispatch({
          type:SET_PROJECTS_INFO,
          data:resData,
      });

    }
}
export const saveProjectInfo=(data)=>{
    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiProjectCreate;
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
        if(resData.status == 0)
             throw new Error(resData.msg);
   
         dispatch({
             type:SET_PROJECTS_INFO,
             data:resData,
         });
   
     }
}   