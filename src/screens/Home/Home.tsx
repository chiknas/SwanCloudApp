import React, {useEffect, useState} from 'react';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';

import {AccountStatus} from './AccountStatus';

export const Home: React.FunctionComponent = () => {
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((currentAccount: Account) => {
      setAccount(currentAccount);
    });
  }, [setAccount]);

  return (
    <>{account && <AccountStatus key={account.name} account={account} />}</>
  );
};
