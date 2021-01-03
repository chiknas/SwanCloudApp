/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'components/Themed';
import {SettingsScreenProps} from 'navigation/types';
import {SaveButton} from './SaveButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Settings} from 'services/AsyncStorage/type';
import {ConnectionTestButton} from './ConnectionTestButton';
import {LastSyncTimestamp} from './LastSyncTimestamp';

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  form_item: {
    marginTop: 10,
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontal_wrapper_item: {
    flex: 1,
  },
});

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = () => {
  const [settings, setSettings] = useState<Settings>({
    lastUploadedTimestamp: new Date().getTime(),
  });

  return (
    <View style={styles.form}>
      <ScrollView>
        <LastSyncTimestamp
          settings={settings}
          setSettings={setSettings}
          style={styles.form_item}
        />
      </ScrollView>
      <View
        style={[
          styles.form_item,
          styles.horizontal_wrapper,
          {justifyContent: 'flex-end'},
        ]}>
        <View style={{marginRight: 10}}>
          <ConnectionTestButton />
        </View>
        <SaveButton settings={settings} />
      </View>
    </View>
  );
};
