import React from 'react';
import {TextField} from '../../../components/TextField';
import {AddAccountFieldProps} from './AccountScreen';
import {View, ViewProps} from '../../../components/Themed';

export const AccountPassword: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  return (
    <View {...viewProps}>
      <TextField
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
