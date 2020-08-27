import React, { useState, useCallback, useEffect } from "react";
import { AccountSummary } from "./AccountSummary";
import { Account } from "../types";
import { FloatingAction } from "react-native-floating-action";
import { AccountScreenProps } from "../../../navigation/types";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { db } from "../../../services/Database";

export default function AccountsScreen({
  navigation,
  route,
}: AccountScreenProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(`SELECT * FROM account`, [], function (tx, res) {
        const temp: Account[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          temp.push(res.rows.item(i));
        }
        setAccounts(temp);
      });
    });
  }, [route]);

  const actions = [
    {
      text: "Swan Server",
      name: "swan_server",
      icon: require("../../../assets/images/swan.png"),
    },
  ];

  const accountsSummaries = accounts.map((account) => {
    return (
      <TouchableOpacity
        key={account.text}
        onPress={() => navigation.navigate("AddAccountScreen")}
      >
        <AccountSummary account={account} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      <ScrollView>{accountsSummaries}</ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={() => {
          navigation.navigate("AddAccountScreen");
        }}
      />
    </>
  );
}
