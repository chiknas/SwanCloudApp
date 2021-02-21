import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Settings} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {HomeScreenProps} from 'navigation/types';
import {StyleSheet} from 'react-native';
import {syncFiles} from 'services/FileSyncTask';
import {defaultSettings} from 'services/AsyncStorage/settingsHelpers';
import {Card} from 'components/Card';
import {ServerStatusCard} from './ServerStatusCard';
import {UnsyncedFotosCard} from './UnsyncedFotosCard';
import {LastUploadedTimestamp} from './LastUploadedTimestampCard';
import {AutoSyncCard} from './AutoSyncCard';
import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import {styleSheet} from 'constants/Styles';
import {ScrollView} from 'react-native-gesture-handler';
import {ServerSettingsCard} from './ServerSettingsCard';

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
  },
});

export const Home: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}: HomeScreenProps) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const backgroundColor = {
    backgroundColor: Colors[useColorScheme()].background,
  };

  const updateSettings = useCallback(() => {
    getStorageItem(STORAGE_ITEMS.SETTINGS).then((settingList: Settings) => {
      setSettings(settingList);
    });
  }, []);

  const isServerSetup = useMemo(() => {
    return settings.apiKey !== undefined && settings.serverUrl !== undefined;
  }, [settings.apiKey, settings.serverUrl]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateSettings();
    });
  }, [navigation, updateSettings]);

  return (
    <ScrollView style={[styleSheet.homeContent, backgroundColor]}>
      <ServerSettingsCard
        onUpdate={() => updateSettings()}
        server={settings.serverUrl}
        serverKey={settings.apiKey}
      />
      {isServerSetup && <ServerStatusCard style={styles.card} />}
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
    </ScrollView>
  );
};
