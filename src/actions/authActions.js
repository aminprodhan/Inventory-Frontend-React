import { createNewUser, getAccessTokenName,apiGetUsers } from '../common/config';
import { getCookieKeyInfo } from '../common/CookieService';
import { CREATE_USER, SET_CURRENT_USER,SET_CURRENT_USER_EXIST,
  SET_CURRENT_USER_NOT_FOUND ,SET_REFRESH_STORETRANSECTION,
   SET_USERS_LIST} from './user_types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user:user,
  };
}

export function logout() {
  return dispatch => {

  }
}

export function setCurrentUserExist(user) {
  return {
    type: SET_CURRENT_USER_EXIST,
    user:user,
  };
}

export function checkValidUser(type,msg) {
  return {
    type: type,
    user:msg,
  };
}

export function isPropCheck(){

  return dispatch => {
   return {
     type : "hello"
   }
  }
}

export function login(data) {
  return dispatch => {
    dispatch(setCurrentUser(999));
  }
}


export function updateStoreInvoice(data)
{
      return {
          type:"SET_REFRESH_STORETRANSECTION",
          updateinvoiceTransection:data,
      }

}
export const getUsers=()=>{

    return async (dispatch,getState)=>{

      const tokenId=getCookieKeyInfo(getAccessTokenName);
      const apiLink=apiGetUsers;
      const response = await fetch(apiLink);
      if(!response.ok){
            throw new Error('Something went wrong..')
      }
      const resData=await response.json();
      if(resData.status == 0)
          throw new Error(resData.msg);
      dispatch({
          type:SET_USERS_LIST,
          data:resData.list,
          role_list:resData.role_list,
      });

    }
}
export const createUser=(data)=>{

  return async (dispatch,getState)=>{

     const tokenId=getCookieKeyInfo(getAccessTokenName);

     const apiLink=createNewUser;
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
          type:CREATE_USER,
          data:resData.list,
      });

  }
}
