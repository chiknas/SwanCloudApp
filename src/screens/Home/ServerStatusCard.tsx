import {Card} from 'components/Card';
import {Text} from 'components/Themed';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {isServerReachable} from 'services/FileSyncTask';

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: '#99ff99',
  },
  disabled: {
    backgroundColor: '#ff6666',
  },
});

export const ServerStatusCard: React.FunctionComponent = () => {
  const [serverStatus, setServerStatus] = useState<boolean>(true);
  const [testingServerStatus, setTestingServerStatus] = useState<boolean>(
    false,
  );

  return (
    <Card
      title="SERVER STATUS"
      onPress={async () => {
        setTestingServerStatus(true);
        setServerStatus(await isServerReachable());
        setTestingServerStatus(false);
      }}
      style={[serverStatus ? styles.enabled : styles.disabled]}>
      <Text>
        {testingServerStatus
          ? 'Testing connection to server...'
          : 'Click to test connection'}
      </Text>
    </Card>
  );
};
