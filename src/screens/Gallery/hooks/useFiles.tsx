import {DependencyList, useEffect, useState} from 'react';
import {GalleryItem} from '../types';
import {SWAN_SERVER_URL} from '@env';
import {isServerReachable} from 'services/FileSyncTask';

export const useFiles = (uncategorizedOnly: boolean, deps?: DependencyList) => {
  const [data, setData] = useState<GalleryItem[]>([]);

  useEffect(() => {
    isServerReachable().then((isServerUp) => {
      if (isServerUp) {
        fetch(
          `${SWAN_SERVER_URL}/files${
            uncategorizedOnly ? '/uncategorized' : ''
          }`,
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
  }, [...deps, uncategorizedOnly]);
  return data;
};
