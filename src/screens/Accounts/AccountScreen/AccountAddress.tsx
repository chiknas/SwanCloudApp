import React, {useMemo, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {database} from 'services/Database/Database';
import {Account} from '../types';
import {AccountTableFields} from 'services/Database/Tables';

export const AccountAddress: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountAddress, setCurrentAccountAddress] = useState<string>(
    '',
  );
  database.then((db) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM account', [], function (tx, res) {
        const account: Account = res.rows.item(0);
        setCurrentAccountAddress(account[AccountTableFields.ADDRESS]);
      });
    });
  });

  return (
    <View {...viewProps}>
      <TextField
        defaultValue={currentAccountAddress}
        onChangeText={(text) =>
          setForm((form) => {
            form.address = text;
            return form;
          })
        }
        label="Address"
      />
    </View>
  );
};
