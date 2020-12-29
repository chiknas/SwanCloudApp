import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Gallery: undefined;
  Home: undefined;
  Accounts: undefined;
  TabTwo: undefined;
};

export type GalleryParamList = {
  GalleryScreen: undefined;
};

export type GalleryScreenProps = StackScreenProps<
  GalleryParamList,
  'GalleryScreen'
>;

export type HomeParamList = {
  HomeScreen: undefined;
};

export type HomeScreenProps = StackScreenProps<HomeParamList, 'HomeScreen'>;

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
