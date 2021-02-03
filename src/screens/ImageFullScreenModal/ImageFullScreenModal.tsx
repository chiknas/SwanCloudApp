import {Text, View} from 'components/Themed';
import {ImageFullScreenModalProps} from 'navigation/types';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {SetFileDatePickerPopup} from './SetFileDatePickerPopup';

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
  menu_item: {
    fontSize: 17,
    padding: 10,
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
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

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
            <MenuOption onSelect={() => setDatePickerVisible(true)}>
              <Text style={styles.menu_item}>Set Date</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert('Delete')}>
              <Text style={styles.menu_item}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.image_container}>
        <Image
          source={{uri: `data:image/png;base64,${item.thumbnail}`}}
          style={styles.image}
        />
      </View>

      {datePickerVisible && (
        <SetFileDatePickerPopup
          file={item}
          onClose={() => setDatePickerVisible(false)}
        />
      )}
    </View>
  );
};
