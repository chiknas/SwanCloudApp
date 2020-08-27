import React, { useState } from "react";
import { StyleSheet, Button } from "react-native";
import { View } from "../../../components/Themed";
import { AddAccountScreenProps } from "../../../navigation/types";
import { Title } from "../../../components/Title";
import { Divider } from "../../../components/Divider";
import { AccountName } from "./AccountName";
import { AccountUsername } from "./AccountUsername";
import { AccountPassword } from "./AccountPassword";
import { AccountAddress } from "./AccountAddress";
import { AccountPort } from "./AccountPort";
import { SaveButton } from "./SaveButton";
import { ScrollView } from "react-native-gesture-handler";

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

export type AccountForm = {
  name: string;
  address: string;
  port: number;
  username: string;
  password: string;
};

export type AddAccountFieldProps = {
  setForm: (value: React.SetStateAction<AccountForm>) => void;
  form?: AccountForm;
  screenProps?: AddAccountScreenProps;
};

export const AddAccountScreen: React.FunctionComponent<AddAccountScreenProps> = (screenProps) => {
  const [form, setForm] = useState<AccountForm>({
    name: "",
    address: "",
    port: 21,
    username: "",
    password: "",
  });

  return (
    <View style={styles.form}>
      <ScrollView>
        <AccountName setForm={setForm} />
        <AccountUsername setForm={setForm} style={styles.form_item} />
        <AccountPassword setForm={setForm} style={styles.form_item} />

        <Divider style={{ marginVertical: 20 }} />
        <Title>Connection</Title>

        <View style={[styles.form_item, styles.horizontal_wrapper]}>
          <AccountAddress setForm={setForm} style={{ flex: 2 }} />
          <AccountPort setForm={setForm} style={{ flex: 1, marginLeft: 5 }} />
        </View>
      </ScrollView>
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
        <SaveButton setForm={setForm} screenProps={screenProps} form={form} />
      </View>
    </View>
  );
};
