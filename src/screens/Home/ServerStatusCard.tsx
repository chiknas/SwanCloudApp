import {Card} from 'components/Card';
import {Text} from 'components/Themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {isServerReachable} from 'services/FileSyncTask';

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: '#99ff99',
  },
  disabled: {
    backgroundColor: '#ff6666',
  },
  testing: {
    backgroundColor: '#D3D3D3',
  },
});

export const ServerStatusCard: React.FunctionComponent = () => {
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [testingServerStatus, setTestingServerStatus] = useState<boolean>(true);
  const [cardCSSMode, setCardCSSMode] = useState(styles.testing);

  // test connection to the server when rendering the component
  useEffect(() => {
    setTestingServerStatus(true);
    isServerReachable().then((status) => {
      setServerStatus(status);
      setTestingServerStatus(false);
    });
  }, []);

  // when server status or currently testing status update card css
  useEffect(() => {
    if (testingServerStatus) {
      setCardCSSMode(styles.testing);
    } else {
      setCardCSSMode(serverStatus ? styles.enabled : styles.disabled);
    }
  }, [testingServerStatus, serverStatus]);

  return (
    <Card
      title="SERVER STATUS"
      onPress={async () => {
        setTestingServerStatus(true);
        setServerStatus(await isServerReachable());
        setTestingServerStatus(false);
      }}
      style={cardCSSMode}>
      <Text>
        {testingServerStatus
          ? 'Testing connection to server...'
          : 'Click to test connection'}
      </Text>
    </Card>
  );
};
