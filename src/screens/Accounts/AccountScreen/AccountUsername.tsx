import React, {useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {database} from 'services/Database/Database';
import {Account} from '../types';
import {AccountTableFields} from 'services/Database/Tables';

export const AccountUsername: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountUserName, setCurrentAccountUserName] = useState<string>(
    '',
  );
  database.then((db) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM account', [], function (tx, res) {
        const account: Account = res.rows.item(0);
        setCurrentAccountUserName(account[AccountTableFields.USERNAME]);
      });
    });
  });

  return (
    <View {...viewProps}>
      <TextField
        defaultValue={currentAccountUserName}
        onChangeText={(text) =>
          setForm((form) => {
            form.username = text;
            return form;
          })
        }
        label="Login Username"
      />
    </View>
  );
};
