import {View} from 'components/Themed';
import {ImageFullScreenModalProps} from 'navigation/types';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 290,
  },
});

export const ImageFullScreenModal: React.FunctionComponent<ImageFullScreenModalProps> = ({
  route,
}: ImageFullScreenModalProps) => {
  const {item} = route.params;

  return (
    <View style={styles.homeContent}>
      <Image
        source={{uri: `data:image/png;base64,${item.thumbnail}`}}
        style={styles.image}
      />
    </View>
  );
};
