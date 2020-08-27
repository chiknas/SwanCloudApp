import React from "react";
import { TextField } from "../../../components/TextField";
import { AddAccountFieldProps } from "./AddAccountScreen";
import { View, ViewProps } from "../../../components/Themed";

export const AccountName: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({ setForm, ...viewProps }) => {
  return (
    <View {...viewProps}>
      <TextField
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
