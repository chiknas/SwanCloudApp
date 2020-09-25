import 'react-native-gesture-handler';
import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from 'navigation/Navigation';
import useCachedResources from 'hooks/useCachedResources';

//TODO: for navigation to work on iOS we might need cocoapods https://reactnative.dev/docs/navigation
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {/* <StatusBar /> */}
      </SafeAreaProvider>
    );
  }
}
