import React from "react";
import { AddAccountScreenProps } from "../../navigation/types";
import { AccountType } from "./types";
import { AddFtpAccountScreen } from "./AddFtpAccountScreen";

export const AddAccountScreen: React.FunctionComponent<AddAccountScreenProps> = ({
  route,
}) => {
  switch (route.params?.name) {
    case AccountType.FTP:
      return <AddFtpAccountScreen />;
      break;
    default:
      return <h1>Screen not found</h1>;
  }
};
