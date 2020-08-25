import React, { PropsWithChildren } from "react";

export type Store = {
  screenOptions?: {
    headerStyle?: {
      backgroundColor?: string;
    };
    headerTintColor?: string;
    headerTitleStyle?: {
      fontWeight?: string;
    };
  };
};

export const NavigatorContext = React.createContext<Store>({
  screenOptions: {
    headerStyle: {
      backgroundColor: "",
    },
    headerTintColor: "",
    headerTitleStyle: {
      fontWeight: "",
    },
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
