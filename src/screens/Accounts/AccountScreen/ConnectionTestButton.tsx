import React from 'react';
import {Alert, Button} from 'react-native';

import {Account} from 'services/AsyncStorage/type';
import FtpClient from 'services/FtpClient/FtpClient';

export type ConnectionTestButtonProps = {
  account: Account;
};

export const ConnectionTestButton: React.FunctionComponent<ConnectionTestButtonProps> = ({
  account,
}) => {
  const ftp = new FtpClient();

  const testConnection = () => {
    ftp
      .connectionTest(account)
      .then(() => {
        Alert.alert('Success!', 'Connected to the server. All good!', [
          {text: 'OK'},
        ]);
      })
      .catch(() => {
        Alert.alert('Fail!', 'Wrong credentials.', [{text: 'OK'}]);
      });
  };
  return (
    <Button
      title="Test Connection"
      onPress={testConnection}
      color={'#f5ce42'}
    />
  );
};
