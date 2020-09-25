import React from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AddAccountScreen';
import {View, ViewProps} from '../../../components/Themed';

export const AccountAddress: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  return (
    <View {...viewProps}>
      <TextField
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
