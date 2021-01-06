import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid} from 'react-native';
import {getStorageItem, storeItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {defaultSettings} from 'services/AsyncStorage/settingsHelpers';
import BackgroundFetch from 'react-native-background-fetch';
import {syncFiles} from 'services/FileSyncTask';

async function requestReadPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // get read permission to read files on the device
        await requestReadPermission();
        const settings = await getStorageItem(STORAGE_ITEMS.SETTINGS);
        if (!settings) {
          await storeItem(STORAGE_ITEMS.SETTINGS, defaultSettings);
        }

        BackgroundFetch.configure(
          {
            minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
            // Android options
            forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
            stopOnTerminate: false,
            enableHeadless: true,
            startOnBoot: true,
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
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
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
