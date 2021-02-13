import {GalleryItem} from '../types';

export type FilesResponse = {
  nextCursor: string;
  nodes: GalleryItem[];
};
