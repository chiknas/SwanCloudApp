import {Title} from 'components/Title';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {Account} from 'screens/Accounts/types';
import {AccountTableFields} from 'services/Database/Tables';
import FtpClient from 'services/FtpClient/FtpClient';
import MediaAlbum from 'services/MediaAlbum/MediaAlbum';

const styles = StyleSheet.create({
  account_wrapper: {
    display: 'flex',
    marginTop: 10,
    padding: 20,
  },
  account: {
    flex: 1,
    marginLeft: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export type AccountStatusProps = {
  account: Account;
};

export const AccountStatus: React.FunctionComponent<AccountStatusProps> = ({
  account,
}) => {
  const [numberOfPendingImages, setNumberOfPendingImages] = useState<number>(0);
  const ftp = new FtpClient();
  const mediaAlbum = new MediaAlbum();
  const latestMediaFilesPromise = mediaAlbum.getLatestMedia(
    account.last_uploaded_timestamp,
  );

  latestMediaFilesPromise.then((image) => {
    setNumberOfPendingImages(image.edges.length);
  });

  const onSync = useCallback(() => {
    latestMediaFilesPromise.then((result) => {
      const files = result.edges.map((edge) => mediaAlbum.edgeToFile(edge));
      ftp.uploadFiles(files, account);
    });
  }, [account, ftp, latestMediaFilesPromise, mediaAlbum]);

  return (
    <View style={styles.account_wrapper}>
      <View style={styles.horizontal_wrapper}>
        <Image
          source={require('assets/images/swan.png')}
          style={styles.image}
        />
        <View style={styles.account}>
          <Title>{account[AccountTableFields.TEXT]}</Title>
          <Text>{`Unsynced fotos: ${numberOfPendingImages}`}</Text>
        </View>
        <Button title="Sync" onPress={onSync} />
      </View>
    </View>
  );
};
