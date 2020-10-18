import React from 'react';
import {AddAccountFieldProps} from './AccountScreen';
import {View} from '/components/Themed';
import {Button, StyleSheet} from 'react-native';
import {storeItem} from 'services/AsyncStorage/storageHelpers';
import {STORAGE_ITEMS} from 'services/AsyncStorage/type';

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
});

export const SaveButton: React.FunctionComponent<AddAccountFieldProps> = ({
  form,
  screenProps,
}) => {
  const save = () => {
    if (!form) {
      return;
    }
    storeItem(STORAGE_ITEMS.ACCOUNT, form).then(() => {
      screenProps?.navigation.navigate('HomeScreen');
    });
  };

  return (
    <View style={styles.button}>
      <Button onPress={save} title="save">
        SAVE
      </Button>
    </View>
  );
};
