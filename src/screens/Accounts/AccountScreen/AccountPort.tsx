import React, {useEffect, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';
import {Account, STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';

export const AccountPort: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountPort, setCurrentAccountPort] = useState<number>(21);

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      setCurrentAccountPort(account.port);
      setForm((form) => {
        form.port = account.port;
        return form;
      });
    });
  }, [setForm]);

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
