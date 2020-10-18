import React, {useEffect, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';

export const AccountUsername: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountUserName, setCurrentAccountUserName] = useState<string>(
    '',
  );

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      setCurrentAccountUserName(account.username);
      setForm((form) => {
        form.username = account.username;
        return form;
      });
    });
  }, [setForm]);

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
