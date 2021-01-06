import React from 'react';
import {Alert, Button} from 'react-native';

import {Settings} from 'services/AsyncStorage/type';
import {isServerReachable} from 'services/FileSyncTask';

const testConnection = async () => {
  isServerReachable().then((isServerUp) => {
    if (isServerUp) {
      Alert.alert('Success!', 'Connected to the server. All good!', [
        {text: 'OK'},
      ]);
    } else {
      Alert.alert('Fail!', 'Could not contact the server', [{text: 'OK'}]);
    }
  });
};

export type ConnectionTestButtonProps = {
  settings: Settings;
};

export const ConnectionTestButton: React.FunctionComponent = () => {
  return (
    <Button
      title="Test Connection"
      onPress={testConnection}
      color={'#f5ce42'}
    />
  );
};
