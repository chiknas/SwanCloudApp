import React from "react";
import { TextField } from "../../../components/TextField";
import { AddAccountFieldProps } from "./AddAccountScreen";
import { View, ViewProps } from "../../../components/Themed";

export const AccountPort: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({ setForm, ...viewProps }) => {
  return (
    <View {...viewProps}>
      <TextField
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
