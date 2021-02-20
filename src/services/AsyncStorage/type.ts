export enum STORAGE_ITEMS {
  SETTINGS = 'settings',
}

export type Settings = {
  serverUrl: string | undefined;
  apiKey: string | undefined;
  lastUploadedTimestamp: number;
  isAutoSync: boolean;
};
