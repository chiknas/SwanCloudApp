import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Accounts: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type AccountsParamList = {
  AccountScreen: undefined;
  HomeScreen: undefined;
};

export type AccountScreenProps = StackScreenProps<
  AccountsParamList,
  'AccountScreen'
>;

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
