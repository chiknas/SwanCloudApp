import {View} from 'components/Themed';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GalleryItem} from './types';
import {useNavigation} from '@react-navigation/native';

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

  return (
    <View style={styles.container}>
      {item.thumbnail && item.thumbnail.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ImageFullScreenModal', {item: item});
          }}>
          <Image
            style={styles.imageThumbnail}
            source={{uri: `data:image/png;base64,${item.thumbnail}`}}
          />
        </TouchableOpacity>
      ) : (
        <Image
          style={styles.imageThumbnail}
          source={{uri: `data:image/png;base64,${item.thumbnail}`}}
        />
      )}
    </View>
  );
};
