import React, {PropsWithChildren} from 'react';

export type Store = {
  screenOptions?: {
    headerStyle?: {
      backgroundColor?: string;
    };
    headerTintColor?: string;
  };
};

export const NavigatorContext = React.createContext<Store>({
  screenOptions: {
    headerStyle: {
      backgroundColor: '',
    },
    headerTintColor: '',
  },
});

export type NavigatorContextProps = {
  store: Store;
};

export const NavigationStore = ({
  children,
  store,
}: PropsWithChildren<NavigatorContextProps>) => {
  return (
    <NavigatorContext.Provider value={store}>
      {children}
    </NavigatorContext.Provider>
  );
};
