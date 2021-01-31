import {Text, View} from 'components/Themed';
import {ImageFullScreenModalProps} from 'navigation/types';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  flex: {
    flex: 1,
  },
  image_container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
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
      <View style={styles.horizontal_wrapper}>
        <View style={styles.flex} />
        <Menu>
          <MenuTrigger>
            <Image source={require('assets/images/three-dots.png')} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert('Save')} text="Save" />
            <MenuOption onSelect={() => alert('Delete')}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => alert('Not called')}
              disabled={true}
              text="Disabled"
            />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.image_container}>
        <Image
          source={{uri: `data:image/png;base64,${item.thumbnail}`}}
          style={styles.image}
        />
      </View>
    </View>
  );
};
