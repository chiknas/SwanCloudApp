import {File} from './MediaAlbum/types';
import {SWAN_SERVER_URL} from '@env';
import MediaAlbum from './MediaAlbum/MediaAlbum';
import {Settings, STORAGE_ITEMS} from './AsyncStorage/type';
import {getStorageItem} from './AsyncStorage/storageHelpers';
import {updateLastSyncTimestamp} from './AsyncStorage/settingsHelpers';

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

  for (const file of unSyncFiles) {
    const formdata = new FormData();
    formdata.append('file', {
      uri: file.uri,
      name: file.filename,
      type: file.fileType,
    });

    await fetch(`${SWAN_SERVER_URL}/upload`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Connection: 'Keep-Alive',
        'Keep-Alive': 'timeout=10, max=25',
        'Content-Type':
          'multipart/form-data; boundary=------------------------a2410779161f588f',
      },
      body: formdata,
    })
      .then(() => {
        updateLastSyncTimestamp(file.timestamp);
        console.log('file uploaded');
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
