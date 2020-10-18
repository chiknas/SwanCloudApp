import {getStorageItem, storeItem} from './storageHelpers';
import {Account, STORAGE_ITEMS} from './type';

const item = STORAGE_ITEMS.ACCOUNT;

export const updateAccountTimestamp = (timestamp?: number) => {
  getStorageItem(item).then((account: Account) => {
    account.lastUploadedTimestamp = timestamp ?? new Date().getTime();
    storeItem(item, account);
  });
};
