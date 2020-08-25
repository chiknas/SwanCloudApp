import React from "react";
import { AccountSummary } from "./AccountSummary";
import { Account, AccountType } from "./types";
import { FloatingAction } from "react-native-floating-action";
import { AccountScreenProps } from "../../navigation/types";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AccountsScreen({ navigation }: AccountScreenProps) {
  const accounts: Account[] = [
    { type: AccountType.FTP, text: "nikos", address: "localhost", port: 8080 },
    { type: AccountType.FTP, text: "test", address: "localhost", port: 8080 },
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
        onPress={() => navigation.navigate("AddAccountScreen", actions[0])}
      >
        <AccountSummary key={account.text} account={account} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      {accountSummaries}
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
