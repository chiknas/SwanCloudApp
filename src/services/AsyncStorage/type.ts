export enum STORAGE_ITEMS {
  SETTINGS = 'settings',
}

export type Settings = {
  lastUploadedTimestamp: number;
  isAutoSync: boolean;
};
