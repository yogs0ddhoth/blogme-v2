import * as React from 'react';
import decode, { JwtPayload } from "jwt-decode";

type Token = {
  user:string
  exp:number
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
      return {user: '', id: 0, auth: null};
    }
    const decodedToken = decode<Token>(token)

    if (decodedToken.exp < Date.now()/1000) {
      return {user: '', id: 0, auth: null}
    }
    return {user:decodedToken.sub.user, id: decodedToken.sub.id, auth:token}
  };

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