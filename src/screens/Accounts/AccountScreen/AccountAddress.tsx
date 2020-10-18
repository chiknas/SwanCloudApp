import React, {useEffect, useState} from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';

import {Account} from 'services/AsyncStorage/type';

import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';

export const AccountAddress: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [currentAccountAddress, setCurrentAccountAddress] = useState<string>(
    '',
  );

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      setCurrentAccountAddress(account.address);
      setForm((form) => {
        form.address = account.address;
        return form;
      });
    });
  }, [setForm]);

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
