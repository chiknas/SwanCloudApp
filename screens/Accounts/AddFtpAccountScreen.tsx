import React, { useState } from "react";
import { TextField } from "../../components/TextField";
import { StyleSheet, Button } from "react-native";
import { View } from "../../components/Themed";
import { AccountType } from "./types";
import { db } from "../../services/Database";
import Navigation from "../../navigation";
import { AddAccountScreenProps } from "../../navigation/types";

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  form_item: {
    marginTop: 10,
  },
  horizontal_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  horizontal_wrapper_item: {
    flex: 1,
  },
});

export const AddFtpAccountScreen: React.FunctionComponent<AddAccountScreenProps> = ({
  navigation,
}) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    port: 21,
    type: AccountType.FTP,
  });

  const save = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO account(text, address, port, type) 
      VALUES ('${form.name}', '${form.address}', ${form.port}, '${form.type}')`,
        [],
        function (tx, res) {
          navigation.navigate("AccountsScreen", { refresh: true });
        }
      );
    });
  };

  return (
    <View style={styles.form}>
      <TextField
        onChangeText={(text) =>
          setForm((form) => {
            form.name = text;
            return form;
          })
        }
        label="Name"
        style={styles.form_item}
      />
      <View style={[styles.form_item, styles.horizontal_wrapper]}>
        <TextField
          onChangeText={(text) =>
            setForm((form) => {
              form.address = text;
              return form;
            })
          }
          label="Address"
          style={{ flex: 2 }}
        />
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
          style={{ flex: 1, marginLeft: 5 }}
        />
      </View>

      <View
        style={[
          styles.form_item,
          styles.horizontal_wrapper,
          { justifyContent: "flex-end" },
        ]}
      >
        <View style={{ width: 100, marginRight: 10 }}>
          <Button
            color={"#f5ce42"}
            onPress={() => console.log(form)}
            title="test"
          >
            TEST
          </Button>
        </View>
        <View style={{ width: 100 }}>
          <Button onPress={save} title="save">
            SAVE
          </Button>
        </View>
      </View>
    </View>
  );
};
