import React from 'react';
import {Alert, Button} from 'react-native';
import {SWAN_SERVER_URL} from '@env';

import {Settings} from 'services/AsyncStorage/type';

export const isServerReachable = async () => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 5000, 'Request timed out');
  });
  const request = fetch(SWAN_SERVER_URL);
  try {
    await Promise.race([timeout, request]);
    Alert.alert('Success!', 'Connected to the server. All good!', [
      {text: 'OK'},
    ]);
  } catch (error) {
    Alert.alert('Fail!', 'Could not contact the server', [{text: 'OK'}]);
  }
};

export type ConnectionTestButtonProps = {
  settings: Settings;
};

export const ConnectionTestButton: React.FunctionComponent = () => {
  return (
    <Button
      title="Test Connection"
      onPress={isServerReachable}
      color={'#f5ce42'}
    />
  );
};
