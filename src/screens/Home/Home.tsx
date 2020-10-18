import React, {useCallback, useEffect, useState} from 'react';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {HomeScreenProps} from 'navigation/types';
import {AccountStatus} from './AccountStatus';

export const Home: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}: HomeScreenProps) => {
  const [account, setAccount] = useState<Account>();

  const updateAccount = useCallback(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((currentAccount: Account) => {
      setAccount(currentAccount);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateAccount();
    });
  }, [navigation, updateAccount]);

  return (
    <>{account && <AccountStatus key={account.name} account={account} />}</>
  );
};
