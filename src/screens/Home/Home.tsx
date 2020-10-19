import React, {useCallback, useEffect, useState} from 'react';
import {Account} from 'services/AsyncStorage/type';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';
import {HomeScreenProps} from 'navigation/types';

import {Button, StyleSheet} from 'react-native';
import {Text, View} from 'components/Themed';
import {Title} from 'components/Title';
import FtpClient from 'services/FtpClient/FtpClient';
import MediaAlbum from 'services/MediaAlbum/MediaAlbum';

const styles = StyleSheet.create({
  homeContent: {
    padding: 0,
    flex: 1,
    display: 'flex',
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    padding: 20,
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
  const ftp = new FtpClient();
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

  const onSync = useCallback(() => {
    latestMediaFilesPromise &&
      account &&
      latestMediaFilesPromise.then((result) => {
        const files = result.edges.map((edge) => mediaAlbum.edgeToFile(edge));
        ftp.uploadFiles(files, account);
      });
  }, [account, ftp, latestMediaFilesPromise, mediaAlbum]);

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
          <View style={styles.horizontal_wrapper}>
            <View style={styles.flex}>
              <Button
                title="Refresh"
                onPress={() => {
                  updateAccount();
                }}
                color={'#f5ce42'}
              />
            </View>
            <View style={styles.flex}>
              <Button title="Sync" onPress={onSync} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};
