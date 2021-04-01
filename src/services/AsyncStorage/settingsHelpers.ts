import {getStorageItem, storeItem} from './storageHelpers';
import {Settings, STORAGE_ITEMS} from './type';
import jsSHA from 'jssha';

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

export const updateServer = async (serverUrl: string, serverKey: string) => {
  await getStorageItem(item).then((settings: Settings) => {
    settings.serverUrl = parseServerUrl(serverUrl);
    const sha256 = new jsSHA('SHA-256', 'TEXT', {encoding: 'UTF8'});
    sha256.update(serverKey);
    settings.apiKey = sha256.getHash('HEX');
    storeItem(item, settings);
  });
};

const parseServerUrl = (url: string) => {
  if (!url.startsWith('http') && !url.startsWith('https')) {
    return `https://${url}/api`;
  }
  return `${url}/api`;
};

export const defaultSettings: Settings = {
  serverUrl: undefined,
  apiKey: undefined,
  lastUploadedTimestamp: 0,
  isAutoSync: false,
};
