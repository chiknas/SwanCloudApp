import {Card} from 'components/Card';
import {ViewProps} from 'components/Themed';
import React from 'react';
import {styleSheet} from 'constants/Styles';
import {updateAutoSync} from 'services/AsyncStorage/settingsHelpers';

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
      style={[isAutoSync ? styleSheet.enabled : styleSheet.disabled, style]}
      onPress={async () => {
        await updateAutoSync(!isAutoSync);
        onUpdate();
      }}
      {...props}
    />
  );
};
