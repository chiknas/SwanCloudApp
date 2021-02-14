import {getStorageItem, storeItem} from './storageHelpers';
import {Settings, STORAGE_ITEMS} from './type';

const item = STORAGE_ITEMS.SETTINGS;

export const updateLastSyncTimestamp = async (timestamp: number) => {
  await getStorageItem(item).then((settings: Settings) => {
    settings.lastUploadedTimestamp = timestamp;
    storeItem(item, settings);
  });
};

export const updateAutoSync = async (isAutoSync: boolean) => {
  await getStorageItem(item).then((settings: Settings) => {
    settings.isAutoSync = isAutoSync;
    storeItem(item, settings);
  });
};

export const defaultSettings: Settings = {
  lastUploadedTimestamp: 0,
  isAutoSync: false,
};
