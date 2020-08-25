import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Account } from "./types";
import { Title } from "../../components/Title";

const styles = StyleSheet.create({
  account_wrapper: {
    display: "flex",
    marginTop: "1em",
    padding: "1em",
  },
  account: {
    flex: 1,
    marginLeft: "1em",
  },
  horizontal_wrapper: {
    display: "flex",
    flexDirection: "row",
  },
});

export type AccountSummaryProps = {
  account: Account;
};

export const AccountSummary: React.FunctionComponent<AccountSummaryProps> = ({
  account,
}) => {
  return (
    <View style={styles.account_wrapper}>
      <View style={styles.horizontal_wrapper}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={{ width: "2em", height: "2em" }}
        />
        <View style={styles.account}>
          <Title>{account.text}</Title>
          <Text>
            {account.address}:{account.port}
          </Text>
        </View>
      </View>
    </View>
  );
};
