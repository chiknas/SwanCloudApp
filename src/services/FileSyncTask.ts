import {File} from './MediaAlbum/types';
import {SWAN_SERVER_URL} from '@env';
import MediaAlbum from './MediaAlbum/MediaAlbum';
import {Settings, STORAGE_ITEMS} from './AsyncStorage/type';
import {getStorageItem, storeItem} from './AsyncStorage/storageHelpers';
import {updateLastSyncTimestamp} from './AsyncStorage/settingsHelpers';
import Upload, {MultipartUploadOptions} from 'react-native-background-upload';

const getUnsyncFiles = async (): Promise<File[]> => {
  const settings: Settings = await getStorageItem(STORAGE_ITEMS.SETTINGS);
  const mediaAlbum = new MediaAlbum();
  const mediaPage = await mediaAlbum.getLatestMedia(
    settings.lastUploadedTimestamp.toString(),
  );
  return mediaPage.edges.map((edge) => mediaAlbum.edgeToFile(edge));
};

export const isServerReachable = async () => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 5000, 'Request timed out');
  });
  const request = fetch(SWAN_SERVER_URL);
  try {
    await Promise.race([timeout, request]);
    return true;
  } catch (error) {
    return false;
  }
};

export const syncFiles = async () => {
  if (await isServerReachable()) {
    const unSyncFiles = await getUnsyncFiles();
    var latestTimeStamp = -1;

    for (const file of unSyncFiles) {
      if (file.timestamp > latestTimeStamp) {
        latestTimeStamp = file.timestamp;
      }

      const options: MultipartUploadOptions = {
        url: `${SWAN_SERVER_URL}/upload`,
        path: file.uri,
        method: 'POST',
        field: 'data',
        type: 'multipart',
        notification: {
          enabled: true,
          autoClear: true,
          notificationChannel: 'SwanCloud Syncing',
          onProgressTitle: 'Uploading',
          onProgressMessage: file.filename ?? '',
          onErrorTitle: 'Failed',
          onErrorMessage: `${file.filename} was rejected`,
        },
      };

      Upload.startUpload(options)
        .then((uploadId) => {
          console.log('Upload started');
          Upload.addListener('progress', uploadId, (data) => {
            console.log(`Progress: ${data.progress}%`);
          });
          Upload.addListener('error', uploadId, (data) => {
            getStorageItem(STORAGE_ITEMS.SETTINGS).then(
              (settings: Settings) => {
                if (settings.lastUploadedTimestamp > file.timestamp) {
                  settings.lastUploadedTimestamp = file.timestamp;
                  storeItem(STORAGE_ITEMS.SETTINGS, settings);
                }
              },
            );
            console.log(`Error: ${data.error}%`);
          });
          Upload.addListener('cancelled', uploadId, (data) => {
            console.log(`Cancelled!`);
          });
          Upload.addListener('completed', uploadId, (data) => {
            console.log('Completed!');
          });
        })
        .catch((err) => {
          console.log('Upload error!', err);
        });
    }

    if (latestTimeStamp > 1) {
      updateLastSyncTimestamp(latestTimeStamp);
    }
  }
};
