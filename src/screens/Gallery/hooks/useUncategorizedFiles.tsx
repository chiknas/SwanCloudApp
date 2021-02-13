import {useEffect, useState} from 'react';
import {SWAN_SERVER_URL} from '@env';
import {isServerReachable} from 'services/FileSyncTask';
import {FilesResponse} from './types';

export const useUncategorizedFiles = (cursor: string | undefined) => {
  const [data, setData] = useState<FilesResponse>();

  useEffect(() => {
    const cursorUrlParam = cursor ? `cursor=${cursor}&` : '';
    const limitParam = 'limit=100';

    isServerReachable().then((isServerUp) => {
      if (isServerUp) {
        fetch(
          `${SWAN_SERVER_URL}/files/uncategorized?${cursorUrlParam}${limitParam}`,
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setData(json);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }, [cursor]);
  return data;
};
