import {Card} from 'components/Card';
import {ViewProps} from 'components/Themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import {updateAutoSync} from 'services/AsyncStorage/settingsHelpers';

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: '#99ff99',
  },
  disabled: {
    backgroundColor: '#ff6666',
  },
});

export type AutoSyncCardProps = {
  isAutoSync: boolean;
  onUpdate: () => void;
};

export const AutoSyncCard: React.FunctionComponent<
  AutoSyncCardProps & ViewProps
> = ({isAutoSync, onUpdate, style, ...props}) => {
  return (
    <Card
      title="AUTO SYNC"
      style={[isAutoSync ? styles.enabled : styles.disabled, style]}
      onPress={async () => {
        await updateAutoSync(!isAutoSync);
        onUpdate();
      }}
      {...props}
    />
  );
};
