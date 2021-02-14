import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from 'navigation/Navigation';
import useCachedResources from 'hooks/useCachedResources';
import BackgroundFetch from 'react-native-background-fetch';
import {BackgroundTask} from 'services/BackgroundTask';
import {MenuProvider} from 'react-native-popup-menu';
import Colors from 'constants/Colors';

// Background task for androids that runs when the app is terminated
BackgroundFetch.registerHeadlessTask(async (event) => {
  await BackgroundTask();
  BackgroundFetch.finish(event.taskId);
});

//TODO: for navigation to work on iOS we might need cocoapods https://reactnative.dev/docs/navigation
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <MenuProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar
            backgroundColor={
              colorScheme ? Colors[colorScheme].background : '#f2f2f2'
            }
          />
        </SafeAreaProvider>
      </MenuProvider>
    );
  }
}
