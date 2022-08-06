import { AuthContext, AuthAction } from 'custom-types';
import * as React from 'react';

import Auth from '../auth';
import { LOGIN, LOGOUT } from './actions';

const {getUser, saveUser, clearUser} = Auth();

export const authReducer = (state:AuthContext, action:AuthAction) => {

  switch (action.type) {
    case LOGIN:
      if (action.payload !== undefined) {
        saveUser(action.payload.auth);
        return {...state, ...getUser()}
      }
      throw new Error('ERROR! PAYLOAD REQUIRED FOR LOGIN!')
    case LOGOUT:
      clearUser()
      return {...state, auth: null}
    default:
      return state
  }
}