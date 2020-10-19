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
  AccountsParamList,
} from './types';
import {Home} from 'screens/Home/Home';
import {AccountScreen} from 'screens/Accounts/AccountScreen/AccountScreen';
import {Image} from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
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
        name="Accounts"
        component={AccountsNavigator}
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

const AccountsStack = createStackNavigator<AccountsParamList>();

function AccountsNavigator() {
  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </AccountsStack.Navigator>
  );
}
