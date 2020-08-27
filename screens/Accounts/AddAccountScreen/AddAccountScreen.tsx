import React from "react";
import { AddAccountScreenProps } from "../../../navigation/types";
import { AccountType } from "../types";
import { AddFtpAccountScreen } from "./ftp/AddFtpAccountScreen";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "../../../components/Themed";

export const AddAccountScreen: React.FunctionComponent<AddAccountScreenProps> = ({
  route,
  navigation,
}) => {
  const type = route.params?.name;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {type === AccountType.FTP && (
          <AddFtpAccountScreen route={route} navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
};
