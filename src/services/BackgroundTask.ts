import BackgroundFetch from 'react-native-background-fetch';
import {syncFiles} from './FileSyncTask';

export const backgroundTaskConfig = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      // Android options
      forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_UNMETERED,
      requiresCharging: false,
      requiresDeviceIdle: false,
      requiresBatteryNotLow: false,
      requiresStorageNotLow: false,
    },
    async (taskId) => {
      await syncFiles();
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.log(error);
    },
  );

  // Optional: Query the authorization status.
  BackgroundFetch.status((status) => {
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log('BackgroundFetch restricted');
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log('BackgroundFetch denied');
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log('BackgroundFetch is enabled');
        break;
    }
  });
};
