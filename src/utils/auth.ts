import { UserAuth } from 'custom-types';
import decode from 'jwt-decode';

type Token = {
  user: string;
  exp: number;
  sub: {
    user: string;
    id: number;
    email: string;
  };
};
export default function Auth() {
  function getToken() {
    return localStorage.getItem('token');
  }

  function authExpired(token: string) {
    const decodedToken = decode<Token>(token);
    return (decodedToken.exp < Date.now()/1000) ? true : false;
  }

  function getUser(): UserAuth {
    const token = getToken();
    const emptyAuth = { user: '', id: 0, auth: '' };
    if (token === null) {
      return emptyAuth;
    }
    const decodedToken = decode<Token>(token);
    return (
      decodedToken.exp < Date.now()/1000
    ) 
      ? emptyAuth 
      : {
          user: decodedToken.sub.user,
          id: decodedToken.sub.id,
          auth: token,
        };
  }

  function saveUser(token: string) {
    localStorage.setItem('token', token);
  }

  function clearUser() {
    localStorage.removeItem('token');
  }

  return {
    authExpired,
    saveUser,
    clearUser,
    getUser,
  };
}
