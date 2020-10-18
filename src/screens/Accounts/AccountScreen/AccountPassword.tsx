import React, {useMemo, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {database} from 'services/Database/Database';
import {Account} from '../types';
import {AccountTableFields} from 'services/Database/Tables';

export const AccountPassword: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountPassword, setCurrentAccountPassword] = useState<string>(
    '',
  );
  database.then((db) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM account', [], function (tx, res) {
        const account: Account = res.rows.item(0);
        setCurrentAccountPassword(account[AccountTableFields.ADDRESS]);
      });
    });
  });

  return (
    <View {...viewProps}>
      <TextField
        defaultValue={currentAccountPassword}
        onChangeText={(text) =>
          setForm((form) => {
            form.password = text;
            return form;
          })
        }
        secureTextEntry={true}
        label="Password"
      />
    </View>
  );
};
