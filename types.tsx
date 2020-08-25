export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  Accounts: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  TestScreen: undefined;
};

export type AccountsParamList = {
  AccountsScreen: undefined;
  AccountDetailsScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Account = {
  name: string;
  address: string;
  port: number;
};
