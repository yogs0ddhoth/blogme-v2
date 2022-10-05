import { UserAuth, AuthAction } from 'custom-types';

import Auth from '../auth';
import { LOGIN, LOGOUT } from './actions';

const { getUser, saveUser, clearUser } = Auth();

export const authReducer = (state: UserAuth, action: AuthAction) => {
  switch (action.type) {
    case LOGIN:
      if (action.payload !== undefined) {
        saveUser(action.payload.auth);
        return { ...state, ...getUser() };
      }
      throw new Error('ERROR! PAYLOAD REQUIRED FOR LOGIN!');
    case LOGOUT:
      clearUser();
      return { ...state, user: '', id: 0, auth: '' };
    default:
      return state;
  }
};
