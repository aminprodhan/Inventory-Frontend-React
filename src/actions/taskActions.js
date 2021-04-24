
import {getAccessTokenName, apiTaskManage,apiTaskCreate
    ,apiTaskDetailsByStatus,apiTaskStatusLog,
    apiTasksByFilter,apiTaskMySchedules,apiProjectInfoByUser,
    apiGetFilteredMyTasks,apiTaskReportByUser,apiUsersActivity,apiReportByTask } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import {SAVE_TASKS_LOG_BY_STATUS,SET_TASKS_INFO,
    SET_NEW_TASKS,SET_TASKS_INFO_BY_STATUS,SET_TASKS_SCHEDULE,
    SET_TASKS_PROJECT_USERS,
    SET_FILTER_TASKS_INFO,SET_TASKS_REPORT_BY_USER,SET_USERS_ACTIVITY,SET_REPORT_BY_TASK} from './user_types';

import axios from 'axios';    

export const getTaskDetailsByStatus=(item)=>{

    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiTaskDetailsByStatus+"?tokenId="+tokenId+"&status_id="+item.id;
        //console.log("api="+apiLink);
        const response = await fetch(apiLink);
        if(!response.ok){
              throw new Error('Something went wrong..')
        }
        const resData=await response.json();
        if(resData.status == 0)
            throw new Error(resData.msg);
        dispatch({
            type:SET_TASKS_INFO_BY_STATUS,
            data:resData.tasks,
        });
  
      }
}
export const getProjectsInfoByUser=(pid)=>{

    return async (dispatch,getState)=>{
      const tokenId=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiProjectInfoByUser+"?tokenId="+tokenId+"&projectId="+pid; 
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);


      dispatch({
          type:SET_TASKS_PROJECT_USERS,
          users:resData.users,
          tasks:resData.tasks,
      });


    }
}
export const getTaskInfo=()=>{

    return async (dispatch,getState)=>{
      const tokenId=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiTaskManage+"?tokenId="+tokenId; 
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);
      dispatch({
          type:SET_TASKS_INFO,
          data:resData,
      });

    }
}
export const getMySchedules=()=>{

    return async (dispatch,getState)=>{
        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiTaskMySchedules;
        const response = await axios.get(apiLink, {
              params: {
                  tokenId: tokenId,
              }
        });
       
        const resData=response.data;
        if(resData.status == 0)
            throw new Error(resData.msg);

            dispatch({
                type:SET_TASKS_SCHEDULE,
                data:resData.tasks,
            });
      }
}
export const getTaskByFiltered=(req_data)=>{

    return async (dispatch,getState)=>{

      const tokenId=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiTasksByFilter;

      const response = await axios.get(apiLink, {
            params: {
                tokenId: tokenId,
                reqData:req_data,
            }
      });
      //
      //const response = await fetch(apiLink);
    //   console.log(JSON.stringify(response));
    //   if(!response.ok){
    //         throw new Error('Something went wrong..')
    //   }
    const resData=response.data;
    //console.log("status="+resData.status)
      if(resData.status == 0)
          throw new Error(resData.msg);

     
      dispatch({
          type:SET_TASKS_INFO_BY_STATUS,
          data:resData.tasks,
      });


    }
}
export const saveTaskInfo=(data)=>{
    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiTaskCreate;
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
             type:SET_NEW_TASKS,
             data:resData,
         });
   
     }
}
export const getUsersActivity=(dataParams)=>{

    return async (dispatch,getState)=>{
        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiUsersActivity;
        const response = await axios.get(apiLink, {
              params: {
                  tokenId: tokenId,
                  data:dataParams,
              }
        });
        const resData=response.data;
        if(resData.status == 0)
            throw new Error(resData.msg);

            dispatch({
                type:SET_USERS_ACTIVITY,
                data:resData,
            });
      }
}
export const getTaskReportByUser=(dataParams)=>{
    
    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiTaskReportByUser;
        const response = await axios.get(apiLink, {
              params: {
                  tokenId: tokenId,
                  data:dataParams,
              }
        });
        const resData=response.data;
        if(resData.status == 0)
            throw new Error(resData.msg);
            //SET_TASKS_REPORT_BY_USER
            dispatch({
                type:SET_TASKS_REPORT_BY_USER,
                data:resData,
            });
      }
}
export const reportByTask=(dataParams)=>{
    
    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiReportByTask;
        const response = await axios.get(apiLink, {
              params: {
                  tokenId: tokenId,
                  data:dataParams,
              }
        });
        const resData=response.data;
        if(resData.status == 0)
            throw new Error(resData.msg);

            dispatch({
                type:SET_REPORT_BY_TASK,
                data:resData,
            });
      }
}
export const getFilteredMyTasks=(dataParams)=>{
    
    return async (dispatch,getState)=>{

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiGetFilteredMyTasks;
        const response = await axios.get(apiLink, {
              params: {
                  tokenId: tokenId,
                  data:dataParams,
              }
        });
        const resData=response.data;
        if(resData.status == 0)
            throw new Error(resData.msg);

            dispatch({
                type:SET_FILTER_TASKS_INFO,
                data:resData,
            });
      }
}
export const saveTaskStatus=(data,modalInfo)=>{
    
    return async (dispatch,getState)=>{

        const taskId=modalInfo.data.id;
        const status_id=modalInfo.status_id;

        const tokenId=getCookieKeyInfo(getAccessTokenName);
        const apiLink=apiTaskStatusLog;
        const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ 
               reqData:data,
               tokenId:tokenId,
               taskId:taskId,
               status_id:status_id
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
             type:SAVE_TASKS_LOG_BY_STATUS,
             data:resData,
         });
   
     }
}