import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {BottomTabParamList, HomeParamList, GalleryParamList} from './types';
import {Gallery} from 'screens/Gallery/Gallery';
import {Home} from 'screens/Home/Home';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        activeBackgroundColor: Colors[colorScheme].activeBackgroundColor,
        inactiveBackgroundColor: Colors[colorScheme].inactiveBackgroundColor,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="house"
              size={focused ? size + 5 : size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Gallery"
        component={GalleryNavigator}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              name="collections"
              size={focused ? size + 5 : size}
              color={color}
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
