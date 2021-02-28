import {View} from 'components/Themed';
import React, {useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GalleryItem} from './types';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext, GlobalContextType} from 'services/GlobalContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    height: 90,
  },
});

export type FileThumbnailProps = {
  item: GalleryItem;
};

export const FileThumbnail: React.FunctionComponent<FileThumbnailProps> = ({
  item,
}) => {
  const navigation = useNavigation();
  const {serverUrl, serverKey} = useContext<GlobalContextType>(GlobalContext);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ImageFullScreenModal', {item: item});
          }}>
          <Image
            style={styles.imageThumbnail}
            source={{
              uri: `${serverUrl}/files/thumbnail/${item.id}`,
              headers: {Authorization: serverKey},
              cache: 'reload',
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
