import { AppContext, AuthAction } from 'custom-types';
import * as React from 'react';

import Auth from '../auth';
import { LOGIN, LOGOUT } from './actions';

const {isTokenExpired, saveUser, clearUser} = Auth();

export const authReducer = (state:AppContext, action:AuthAction) => {

  switch (action.type) {
    case LOGIN:
      if (action.payload !== undefined && action.payload.auth !== null) {
        saveUser(action.payload.auth);
        return {
          ...state, 
          user: action.payload.user, 
          id: action.payload.id, 
          auth: action.payload.auth
        }
      }
      throw new Error('ERROR! PAYLOAD REQUIRED FOR LOGIN!')
    case LOGOUT:
      clearUser()
      return {...state, auth: null}
    default:
      return state
  }
}