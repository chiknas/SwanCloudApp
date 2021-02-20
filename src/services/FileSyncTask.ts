import {File} from './MediaAlbum/types';
import {SWAN_SERVER_URL} from '@env';
import MediaAlbum from './MediaAlbum/MediaAlbum';
import {Settings, STORAGE_ITEMS} from './AsyncStorage/type';
import {getStorageItem} from './AsyncStorage/storageHelpers';
import {updateLastSyncTimestamp} from './AsyncStorage/settingsHelpers';
import Upload, {MultipartUploadOptions} from 'react-native-background-upload';
import {apiFetch, getApiHeaders} from './ApiFetch';

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

  const request = apiFetch();
  try {
    await Promise.race([timeout, request]);
    return true;
  } catch (error) {
    return false;
  }
};

const upload = (file: File, unSyncFiles: File[]) => {
  const options: MultipartUploadOptions = {
    url: `${SWAN_SERVER_URL}/upload`,
    path: file.uri,
    method: 'POST',
    field: 'data',
    type: 'multipart',
    headers: getApiHeaders(),
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
      Upload.addListener('error', uploadId, (data) => {
        // set the latest timestamp a little bit earlier to resend this file next time
        updateLastSyncTimestamp(file.timestamp - 1000);
      });

      Upload.addListener('completed', uploadId, (data) => {
        const nextFile = unSyncFiles.pop();
        if (nextFile && data.responseCode === 200) {
          upload(nextFile, unSyncFiles);
        }
      });
    })
    .catch((err) => {
      console.log('Upload error!', err);
    });

  // set the timestamp a little bit later so we dont resend the same file next time
  updateLastSyncTimestamp(file.timestamp + 1000);
};

export const syncFiles = async () => {
  if (await isServerReachable()) {
    const unSyncFiles = await getUnsyncFiles();
    const oldestFile = unSyncFiles.pop();
    if (oldestFile) {
      upload(oldestFile, unSyncFiles);
    }
  }
};
