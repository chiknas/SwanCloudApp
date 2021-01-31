import {StackScreenProps} from '@react-navigation/stack';
import {GalleryItem} from 'screens/Gallery/types';

export type RootStackParamList = {
  Root: undefined;
  ImageFullScreenModal: undefined;
  NotFound: undefined;
};

export type ImageFullScreenModalList = {
  ImageFullScreenScreen: {item: GalleryItem};
};

export type ImageFullScreenModalProps = StackScreenProps<
  ImageFullScreenModalList,
  'ImageFullScreenScreen'
>;

export type BottomTabParamList = {
  Gallery: undefined;
  Home: undefined;
  Settings: undefined;
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

export type SettingsParamList = {
  SettingsScreen: undefined;
  HomeScreen: undefined;
};

export type SettingsScreenProps = StackScreenProps<
  SettingsParamList,
  'SettingsScreen'
>;

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
