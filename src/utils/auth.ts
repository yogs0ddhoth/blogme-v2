import * as React from 'react';
import decode, { JwtPayload } from "jwt-decode";

type Token = {
  user:string 
  sub: {
    user:string
    id:number 
    email:string
  }
}
export default function Auth() {
  function getToken() {
    const token = localStorage.getItem('token');
    return (token !== null) ? token : null;
  };
  function getUser() {
    const token = getToken()
    if (token === null) {
      return {user: '', id: 0, auth: null}
    }
    const decodedToken = decode<Token>(token)
    return {user:decodedToken.sub.user, id: decodedToken.sub.id, auth:token}
  };

  // function isTokenExpired(token:string) {
  //   try {
  //     const decodedToken= decode<JwtPayload>(token);
  //     if (decodedToken.exp !== undefined) {
  //       // check if expiration time has passed
  //       if (decodedToken.exp < Date.now()/1000) {
  //         return true;
  //     }
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // };

  function saveUser(token:string) {
    localStorage.setItem('token', token);
  };

  function clearUser() {
    localStorage.removeItem('token');
  };

  return {
    saveUser,
    // isTokenExpired,
    getToken,
    clearUser,
    getUser
  }
}