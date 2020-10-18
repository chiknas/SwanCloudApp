import React, {useEffect, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {Account} from 'services/AsyncStorage/type';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';

export const AccountName: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountName, setCurrentAccountName] = useState<string>('');

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      setCurrentAccountName(account.name);
      setForm((form) => {
        form.name = account.name;
        return form;
      });
    });
  }, [setForm]);

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
