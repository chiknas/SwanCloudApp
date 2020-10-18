import React, {useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {database} from 'services/Database/Database';
import {Account} from '../types';
import {AccountTableFields} from 'services/Database/Tables';

export const AccountPort: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountPort, setCurrentAccountPort] = useState<number>(21);
  database.then((db) => {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM account', [], function (tx, res) {
        const account: Account = res.rows.item(0);
        setCurrentAccountPort(account[AccountTableFields.PORT]);
      });
    });
  });

  return (
    <View {...viewProps}>
      <TextField
        defaultValue={currentAccountPort.toString()}
        onChangeText={(text) =>
          setForm((form) => {
            form.port = parseInt(text, 10);
            return form;
          })
        }
        label="port"
        keyboardType="numeric"
        maxLength={5}
      />
    </View>
  );
};
