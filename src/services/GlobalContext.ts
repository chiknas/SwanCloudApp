import React from 'react';

export type GlobalContextType = {
  serverUrl: string;
  setServerUrl: (value: string) => void;
  serverKey: string;
  setServerKey: (value: string) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({
  serverUrl: '',
  setServerUrl: () => {},
  serverKey: '',
  setServerKey: () => {},
});
