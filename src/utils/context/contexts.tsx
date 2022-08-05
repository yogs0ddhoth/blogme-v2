import { AppContext } from 'custom-types';
import * as React from 'react';
import Auth from '../auth';
import { authReducer } from './reducers';

const {getUser} = Auth();

const contextFactory = <StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>, initialState: StateType
) => {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  
  const context = React.createContext({state: initialState, dispatch: defaultDispatch});

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
    return <context.Provider value={{ state, dispatch }} {...props} />
  };

  return [context, Provider] as const;
}

export const [authContext, AuthProvider] = contextFactory(authReducer, 
  {...getUser()}
);