import {getStorageItem} from './AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from './AsyncStorage/type';

export const getApiHeaders = async () => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const settings = await getStorageItem(STORAGE_ITEMS.SETTINGS);

  return settings.apiKey
    ? {...defaultHeaders, ...{Authorization: settings.apiKey}}
    : defaultHeaders;
};

export const apiFetch = async (path?: string): Promise<Response> => {
  const settings = await getStorageItem(STORAGE_ITEMS.SETTINGS);

  return fetch(`${settings.serverUrl}${path ?? ''}`, {
    method: 'GET',
    headers: await getApiHeaders(),
  });
};

export const apiPost = async (
  path: string,
  body: string,
): Promise<Response> => {
  const settings = await getStorageItem(STORAGE_ITEMS.SETTINGS);

  return fetch(`${settings.serverUrl}${path}`, {
    method: 'POST',
    headers: await getApiHeaders(),
    body: body,
  });
};
