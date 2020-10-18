import React, {useEffect, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';

export const AccountPassword: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountPassword, setCurrentAccountPassword] = useState<string>(
    '',
  );

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      setCurrentAccountPassword(account.password);
      setForm((form) => {
        form.password = account.password;
        return form;
      });
    });
  }, [setForm]);

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
