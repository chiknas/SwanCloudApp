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
import {NavigatorContext} from './NavigationStore';
import {Home} from 'screens/Home/Home';
import {AccountScreen} from 'screens/Accounts/AccountScreen/AccountScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  // You can explore the built-in icon families and icons on the web at:
  // https://icons.expo.fyi/
  // function TabBarIcon(props: { name: string; color: string }) {
  //   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
  // }

  return (
    <BottomTab.Navigator
      tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        // options={{
        //   tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}
        // options={{
        //   tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        // options={{
        //   tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  const {screenOptions} = React.useContext(NavigatorContext);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{...screenOptions, headerTitle: 'Home'}}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const {screenOptions} = React.useContext(NavigatorContext);

  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{...screenOptions, headerTitle: 'Tab Two Title'}}
      />
    </TabTwoStack.Navigator>
  );
}

const AccountsStack = createStackNavigator<AccountsParamList>();

function AccountsNavigator() {
  const {screenOptions} = React.useContext(NavigatorContext);

  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          ...screenOptions,
          headerTitle: 'New Account',
        }}
      />
    </AccountsStack.Navigator>
  );
}
