import {Title} from 'components/Title';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import {Account} from 'screens/Accounts/types';
import {AccountTableFields} from 'services/Database/Tables';
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
  const mediaAlbum = new MediaAlbum();
  mediaAlbum.getLatestMedia(account.last_uploaded_timestamp).then((image) => {
    setNumberOfPendingImages(image.edges.length);
  });
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
        <Button title="Sync" onPress={() => {}} />
      </View>
    </View>
  );
};
