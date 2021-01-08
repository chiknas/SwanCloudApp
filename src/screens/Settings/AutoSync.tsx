import {View, ViewProps} from 'components/Themed';
import {Title} from 'components/Title';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Switch} from 'react-native';
import {updateAutoSync} from 'services/AsyncStorage/settingsHelpers';
import {Settings} from 'services/AsyncStorage/type';

const styles = StyleSheet.create({
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontal_wrapper_item: {
    flex: 1,
  },
});

export type AutoSyncProps = {
  settings: Settings;
};

export const AutoSync: React.FunctionComponent<AutoSyncProps & ViewProps> = ({
  settings,
  style,
  ...viewProps
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(settings.isAutoSync);

  useEffect(() => {
    updateAutoSync(isEnabled);
  }, [isEnabled]);

  return (
    <View style={[style, styles.horizontal_wrapper]} {...viewProps}>
      <View style={styles.horizontal_wrapper_item}>
        <Title>Auto Sync</Title>
      </View>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value) => {
          setIsEnabled(value);
        }}
        value={isEnabled}
      />
    </View>
  );
};
