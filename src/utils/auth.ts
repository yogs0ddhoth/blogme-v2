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
  function getUser() {
    const token = localStorage.getItem('token');
    if (token === null) {
      return { user: '', id: 0, auth: '' };
    }
    const decodedToken = decode<Token>(token);

    if (decodedToken.exp < Date.now() / 1000) {
      return { user: '', id: 0, auth: '' };
    }
    return {
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
    saveUser,
    clearUser,
    getUser,
  };
}
