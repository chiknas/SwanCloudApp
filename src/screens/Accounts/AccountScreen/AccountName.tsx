import React, {useMemo, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {database} from 'services/Database/Database';
import {Account} from '../types';
import {AccountTableFields} from 'services/Database/Tables';

export const AccountName: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  database.then((db) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM account', [], function (tx, res) {
        const account: Account = res.rows.item(0);
        setCurrentAccountName(account[AccountTableFields.TEXT]);
      });
    });
  });

  return (
    <View {...viewProps}>
      <TextField
        defaultValue={currentAccountName}
        onChangeText={(text) =>
          setForm((form) => {
            form.name = text;
            return form;
          })
        }
        label="Name"
      />
    </View>
  );
};
