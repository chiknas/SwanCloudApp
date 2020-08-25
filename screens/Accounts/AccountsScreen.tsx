import React from "react";
import { AccountSummary } from "./AccountSummary";
import { Account } from "../../types";

export default function AccountsScreen() {
  const accounts: Account[] = [
    { name: "nikos", address: "localhost", port: 8080 },
    { name: "test", address: "localhost", port: 8080 },
  ];
  const accountSummaries = accounts.map((account) => {
    return <AccountSummary key={account.name} account={account} />;
  });

  return <>{accountSummaries}</>;
}
