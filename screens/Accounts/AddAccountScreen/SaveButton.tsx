import React from "react";
import { AddAccountFieldProps } from "./AddAccountScreen";
import { View, ViewProps } from "../../../components/Themed";
import { Button } from "react-native";
import { db } from "../../../services/Database";

export const SaveButton: React.FunctionComponent<AddAccountFieldProps> = ({
  form,
  screenProps,
}) => {
  const save = () => {
    if (!form) {
      return;
    }
    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO account(text, address, port, username, password) 
      VALUES ('${form.name}', '${form.address}', ${form.port}, '${form.username}', '${form.password}')`,
        [],
        function (tx, res) {
          screenProps?.navigation.navigate("AccountsScreen", { refresh: true });
        }
      );
    });
  };

  return (
    <View style={[{ width: 100 }]}>
      <Button onPress={save} title="save">
        SAVE
      </Button>
    </View>
  );
};
