import {View} from 'components/Themed';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {GalleryItem} from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export type FileThumbnailProps = {
  item: GalleryItem;
};

export const FileThumbnail: React.FunctionComponent<FileThumbnailProps> = ({
  item,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageThumbnail}
        source={{uri: `data:image/png;base64,${item.thumbnail}`}}
      />
    </View>
  );
};
