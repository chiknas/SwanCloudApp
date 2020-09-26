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
  AccountsScreen:
    | {
        refresh: boolean;
      }
    | undefined;
  AccountDetailsScreen: undefined;
  AddAccountScreen: undefined;
};

export type AddAccountScreenProps = StackScreenProps<
  AccountsParamList,
  'AddAccountScreen'
>;

export type AccountScreenProps = StackScreenProps<
  AccountsParamList,
  'AccountsScreen'
>;

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
