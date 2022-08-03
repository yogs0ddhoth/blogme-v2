import * as React from 'react';
import decode, { JwtPayload } from "jwt-decode";

export default function useAuth() {
  function getToken() {
    const token = localStorage.getItem('token');
    return (token !== null) ? token : null;
  };
  function getUser() {
    const token = getToken()
    return (token !== null) ? decode(token) : null
  };
  const [token, setToken] = React.useState(getToken());

  // function isTokenExpired(token:string) {
  //   try {
  //     const decodedToken:JwtPayload = decode(token);
  //     // check if expiration time has passed
  //    if (decodedToken.exp < Date.now()/1000) {
  //      return true;
  //    } else {
  //      return false;
  //    }
  //   } catch (err) {
  //     return false;
  //   }
  // }
  function saveUser(token:string) {
    localStorage.setItem('token', token);
    setToken(token);
  };

  function clearUser() {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    saveUser,
    userAuth: token,
    getUser,
    clearUser
  }
}