import {useEffect, useState} from 'react';
import {isServerReachable} from 'services/FileSyncTask';
import {FilesResponse} from './types';
import {apiFetch} from 'services/ApiFetch';

export const useUncategorizedFiles = (cursor: string | undefined) => {
  const [data, setData] = useState<FilesResponse>();

  useEffect(() => {
    const cursorUrlParam = cursor ? `cursor=${cursor}&` : '';
    const limitParam = 'limit=100';

    isServerReachable().then((isServerUp) => {
      if (isServerUp) {
        apiFetch(`/files/uncategorized?${cursorUrlParam}${limitParam}`)
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
