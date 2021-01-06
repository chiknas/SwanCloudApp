import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from 'navigation/Navigation';
import useCachedResources from 'hooks/useCachedResources';
import {HeaderStyles} from 'constants/Header';
import BackgroundFetch from 'react-native-background-fetch';
import {syncFiles} from 'services/FileSyncTask';

// Background task for androids that runs when the app is terminated
BackgroundFetch.registerHeadlessTask(async (event) => {
  await syncFiles();
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
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar backgroundColor={HeaderStyles.backgroundColor} />
      </SafeAreaProvider>
    );
  }
}
