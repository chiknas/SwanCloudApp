import {File} from './MediaAlbum/types';
import {SWAN_SERVER_URL} from '@env';
import MediaAlbum from './MediaAlbum/MediaAlbum';
import {Settings, STORAGE_ITEMS} from './AsyncStorage/type';
import {getStorageItem} from './AsyncStorage/storageHelpers';
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

export const syncFiles = async () => {
  const unSyncFiles = await getUnsyncFiles();
  var latestSuccessTimeStamp = -1;
  var firstFailTimeStamp = -1;

  for (const file of unSyncFiles) {
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
          if (
            firstFailTimeStamp === -1 ||
            file.timestamp < firstFailTimeStamp
          ) {
            firstFailTimeStamp = file.timestamp;
          }
          console.log(`Error: ${data.error}%`);
        });
        Upload.addListener('cancelled', uploadId, (data) => {
          console.log(`Cancelled!`);
        });
        Upload.addListener('completed', uploadId, (data) => {
          if (file.timestamp > latestSuccessTimeStamp) {
            latestSuccessTimeStamp = file.timestamp;
          }
          console.log('Completed!');
        });
      })
      .catch((err) => {
        console.log('Upload error!', err);
      });
  }

  // if we have a fail upload use its timestamp as the last sync point to re sync it next time.
  updateLastSyncTimestamp(
    firstFailTimeStamp > 0 ? firstFailTimeStamp - 1000 : latestSuccessTimeStamp,
  );
};
