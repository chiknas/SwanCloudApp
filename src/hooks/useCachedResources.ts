import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid} from 'react-native';
import {getStorageItem, storeItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {defaultSettings} from 'services/AsyncStorage/settingsHelpers';
import {backgroundTaskConfig} from 'services/BackgroundTask';

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
        backgroundTaskConfig();
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
