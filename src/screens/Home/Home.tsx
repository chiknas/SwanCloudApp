import React, {useEffect, useState} from 'react';
import {Account} from 'screens/Accounts/types';
import {database} from 'services/Database/Database';
import {AccountStatus} from './AccountStatus';

export const Home: React.FunctionComponent = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    database.then((db) => {
      db.transaction((txn) => {
        txn.executeSql('SELECT * FROM account', [], function (tx, res) {
          const temp: Account[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            temp.push(res.rows.item(i));
          }
          setAccounts(temp);
        });
      });
    });
  }, []);

  return (
    <>
      {accounts &&
        accounts.map((account) => (
          <AccountStatus key={account.text} account={account} />
        ))}
    </>
  );
};
