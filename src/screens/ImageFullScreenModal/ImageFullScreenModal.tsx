import {Text, View} from 'components/Themed';
import {ImageFullScreenModalProps} from 'navigation/types';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GlobalContext, GlobalContextType} from 'services/GlobalContext';
import {SetFileDatePickerPopup} from './SetFileDatePickerPopup';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  flex: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  menu_item: {
    fontSize: 17,
    padding: 10,
  },
  image_container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  image: {
    height: 290,
  },
});

export const ImageFullScreenModal: React.FunctionComponent<ImageFullScreenModalProps> = ({
  route,
}: ImageFullScreenModalProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const {serverUrl} = useContext<GlobalContextType>(GlobalContext);

  const {item} = route.params;

  return (
    <View style={styles.homeContent}>
      <View style={styles.horizontal_wrapper}>
        <View style={styles.flex} />
        <Menu>
          <MenuTrigger>
            <MaterialIcons name="menu" size={25} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => setDatePickerVisible(true)}>
              <Text style={styles.menu_item}>Set Date</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert('Download')}>
              <Text style={styles.menu_item}>Download</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert('Delete')}>
              <Text style={styles.menu_item}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.image_container}>
        <Image
          source={{
            uri: `${serverUrl}/files/thumbnail/${item.id}`,
          }}
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
