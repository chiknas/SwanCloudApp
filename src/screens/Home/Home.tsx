/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {HomeScreenProps} from 'navigation/types';
import {Button, StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {Title} from 'components/Title';
import MediaAlbum from 'services/MediaAlbum/MediaAlbum';
import {syncFiles} from 'services/FileSyncTask';

const styles = StyleSheet.create({
  homeContent: {
    padding: 20,
    flex: 1,
    display: 'flex',
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    width: 130,
    height: 130,
  },
});

export const Home: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}: HomeScreenProps) => {
  const [account, setAccount] = useState<Account>();
  const [numberOfPendingImages, setNumberOfPendingImages] = useState<number>(0);
  const mediaAlbum = new MediaAlbum();

  const latestMediaFilesPromise =
    account &&
    mediaAlbum.getLatestMedia(account.lastUploadedTimestamp.toString());

  latestMediaFilesPromise &&
    latestMediaFilesPromise.then((image) => {
      setNumberOfPendingImages(image.edges.length);
    });

  const updateAccount = useCallback(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((currentAccount: Account) => {
      setAccount(currentAccount);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      updateAccount();
    });
  }, [navigation, updateAccount]);

  return (
    <>
      {account && (
        <View style={styles.homeContent}>
          <View style={styles.flex}>
            <Title>{account.name}</Title>
            <Text>{`Unsynced fotos: ${numberOfPendingImages}`}</Text>
            <Text>{`Last upload: ${new Date(
              account.lastUploadedTimestamp,
            )}`}</Text>
          </View>
          <View
            style={[styles.horizontal_wrapper, {justifyContent: 'flex-end'}]}>
            <View style={{marginRight: 10, width: 100}}>
              <Button
                title="Refresh"
                onPress={() => {
                  updateAccount();
                }}
                color={'#f5ce42'}
              />
            </View>
            <View style={{width: 100}}>
              <Button title="Sync" onPress={syncFiles} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};
