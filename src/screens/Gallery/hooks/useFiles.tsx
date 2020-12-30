import {DependencyList, useEffect, useState} from 'react';
import {GalleryItem} from '../types';
import {SWAN_SERVER_URL} from '@env';

export const useFiles = (deps?: DependencyList) => {
  const [data, setData] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch(`${SWAN_SERVER_URL}/files`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, deps);
  return data;
};
