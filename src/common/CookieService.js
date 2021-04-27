import React from 'react';
import Cookie  from 'universal-cookie';

const cookie=new Cookie();
export const setCookie=(key,val,options)=>{
    cookie.set(key,val,{ path: '/' });
}
export const getCookieKeyInfo=(key)=>{
    return cookie.get(key); 
}
export const removeCookie=(key)=>{
    //cookie.remove(key);
    cookie.remove(key, { path: '/' });
}
