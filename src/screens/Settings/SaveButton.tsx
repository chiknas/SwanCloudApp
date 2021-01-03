import React from 'react';
import {View} from '/components/Themed';
import {Alert, Button, StyleSheet} from 'react-native';
import {storeItem} from 'services/AsyncStorage/storageHelpers';
import {Settings, STORAGE_ITEMS} from 'services/AsyncStorage/type';

const styles = StyleSheet.create({
  button: {
    width: 100,
  },
});

export type SaveButtonProps = {
  settings: Settings;
};

export const SaveButton: React.FunctionComponent<SaveButtonProps> = ({
  settings,
}) => {
  const save = () => {
    if (!settings) {
      return;
    }
    storeItem(STORAGE_ITEMS.SETTINGS, settings).then(() => {
      Alert.alert('Settings saved!', '', [{text: 'OK'}]);
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
