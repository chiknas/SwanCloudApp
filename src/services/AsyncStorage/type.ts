export enum STORAGE_ITEMS {
  ACCOUNT = 'account',
}

export type Account = {
  name: string;
  address: string;
  port: number;
  username: string;
  password: string;
  lastUploadedTimestamp: number;
};
