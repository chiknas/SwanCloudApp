import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  BottomTabParamList,
  HomeParamList,
  TabTwoParamList,
  SettingsParamList,
  GalleryParamList,
} from './types';
import {Gallery} from 'screens/Gallery/Gallery';
import {Home} from 'screens/Home/Home';
import {SettingsScreen} from 'screens/Settings/Settings';
import {Image} from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name="Gallery"
        component={GalleryNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              width={1}
              height={1}
              source={require('assets/images/home.png')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              width={1}
              height={1}
              source={require('assets/images/home.png')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              width={1}
              height={1}
              source={require('assets/images/account_icon.png')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              width={1}
              height={1}
              source={require('assets/images/settings.png')}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const GalleryStack = createStackNavigator<GalleryParamList>();

function GalleryNavigator() {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen
        name="GalleryScreen"
        component={Gallery}
        options={{headerShown: false}}
      />
    </GalleryStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{headerShown: false}}
      />
    </TabTwoStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </SettingsStack.Navigator>
  );
}
