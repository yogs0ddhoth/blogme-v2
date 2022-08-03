import { AppContext } from 'custom-types';
import * as React from 'react';

function contextFactory<type>(defaultValue: type) {

  type Update = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  const defaultUpdate:Update = () => defaultValue;

  const context = React.createContext({ state: defaultValue, update: defaultUpdate });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    
    return <context.Provider value={{ state, update }} {...props} />;
  }

  return [context, Provider] as const;
}

export const [authContext, AuthProvider] = contextFactory({}as AppContext);