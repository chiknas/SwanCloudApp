import {Card} from 'components/Card';
import {Text, ViewProps} from 'components/Themed';
import React, {useEffect, useState} from 'react';
import {isServerReachable} from 'services/FileSyncTask';
import {styleSheet} from 'constants/Styles';

export const ServerStatusCard: React.FunctionComponent<ViewProps> = ({
  style,
  ...props
}) => {
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [testingServerStatus, setTestingServerStatus] = useState<boolean>(true);
  const [cardCSSMode, setCardCSSMode] = useState(styleSheet.testing);

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
      setCardCSSMode(styleSheet.testing);
    } else {
      setCardCSSMode(serverStatus ? styleSheet.enabled : styleSheet.disabled);
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
      style={[cardCSSMode, style]}
      {...props}>
      <Text>
        {testingServerStatus
          ? 'Testing connection to server...'
          : 'Click to test connection'}
      </Text>
    </Card>
  );
};
