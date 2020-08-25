import React from "react";
import { AccountSummary } from "./AccountSummary";
import { Account, AccountType } from "./types";
import { FloatingAction } from "react-native-floating-action";
import { AccountScreenProps } from "../../navigation/types";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export default function AccountsScreen({ navigation }: AccountScreenProps) {
  const accounts: Account[] = [
    { type: AccountType.FTP, text: "nikos", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test2", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test3", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test4", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test5", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test6", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test7", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test8", address: "localhost", port: 8080 },
  ];
  const actions = [
    {
      text: "FTP Server",
      name: AccountType.FTP,
      icon: require("../../assets/images/favicon.png"),
    },
  ];

  const accountSummaries = accounts.map((account) => {
    return (
      <TouchableOpacity
        key={account.text}
        onPress={() => navigation.navigate("AddAccountScreen", actions[0])}
      >
        <AccountSummary account={account} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      <ScrollView>{accountSummaries}</ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          navigation.navigate(
            "AddAccountScreen",
            actions.find((action) => {
              return action.name === name;
            })
          );
        }}
      />
    </>
  );
}
