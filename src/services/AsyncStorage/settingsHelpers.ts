import {getStorageItem, storeItem} from './storageHelpers';
import {Settings, STORAGE_ITEMS} from './type';

const item = STORAGE_ITEMS.SETTINGS;

export const updateLastSyncTimestamp = (timestamp: number) => {
  getStorageItem(item).then((settings: Settings) => {
    console.log(timestamp);
    settings.lastUploadedTimestamp = timestamp;
    storeItem(item, settings);
  });
};

export const defaultSettings: Settings = {
  lastUploadedTimestamp: 0,
};
