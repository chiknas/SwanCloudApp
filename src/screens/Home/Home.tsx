import React, {useCallback, useEffect, useState} from 'react';
import {Settings} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {HomeScreenProps} from 'navigation/types';
import {StyleSheet} from 'react-native';
import {View} from 'components/Themed';
import {syncFiles} from 'services/FileSyncTask';
import {defaultSettings} from 'services/AsyncStorage/settingsHelpers';
import {Card} from 'components/Card';
import {ServerStatusCard} from './ServerStatusCard';
import {UnsyncedFotosCard} from './UnsyncedFotosCard';
import {LastUploadedTimestamp} from './LastUploadedTimestampCard';
import {AutoSyncCard} from './AutoSyncCard';

const styles = StyleSheet.create({
  homeContent: {
    padding: 20,
    flex: 1,
    display: 'flex',
  },
  card: {
    marginTop: 15,
  },
});

export const Home: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}: HomeScreenProps) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = useCallback(() => {
    getStorageItem(STORAGE_ITEMS.SETTINGS).then((settingList: Settings) => {
      setSettings(settingList);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateSettings();
    });
  }, [navigation, updateSettings]);

  return (
    <View style={styles.homeContent}>
      <ServerStatusCard />
      <Card title="SYNC NOW" onPress={() => syncFiles()} style={styles.card} />
      <AutoSyncCard
        style={styles.card}
        isAutoSync={settings.isAutoSync}
        onUpdate={() => updateSettings()}
      />
      <UnsyncedFotosCard
        style={styles.card}
        lastUploadedTimestamp={settings.lastUploadedTimestamp}
      />
      <LastUploadedTimestamp
        style={styles.card}
        lastUploadedTimestamp={settings.lastUploadedTimestamp}
        onUpdate={() => updateSettings()}
      />
    </View>
  );
};
