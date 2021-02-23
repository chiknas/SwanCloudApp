import {TextField} from 'components/TextField';
import {styleSheet} from 'constants/Styles';
import React, {useContext, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {updateServer} from 'services/AsyncStorage/settingsHelpers';
import {GlobalContext, GlobalContextType} from 'services/GlobalContext';

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textField: {
    width: 280,
    marginTop: 10,
  },
  buttonRow: {
    marginTop: 10,
  },
  button: {
    margin: 10,
    width: 100,
  },
});

export type ServerSettingsModalProps = {
  onClose: () => void;
};

export const ServerSettingsModal: React.FunctionComponent<ServerSettingsModalProps> = ({
  onClose,
}) => {
  const [url, setUrl] = useState<string | undefined>();
  const [key, setKey] = useState<string | undefined>();
  const {setServerUrl} = useContext<GlobalContextType>(GlobalContext);

  const updateServerDetails = async () => {
    if (url && key) {
      await updateServer(url, key);
      setServerUrl(url);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {}}>
      <KeyboardAvoidingView style={styles.modalView}>
        <TextField
          style={styles.textField}
          label="Server URL"
          value={url}
          onChangeText={(text) => setUrl(text)}
        />
        <TextField
          secureTextEntry={true}
          style={styles.textField}
          label="Password"
          value={key}
          onChangeText={(text) => setKey(text)}
        />
        <View style={[styleSheet.horizontal_wrapper, styles.buttonRow]}>
          <View style={styles.button}>
            <Button
              title="ok"
              onPress={async () => {
                await updateServerDetails();
                onClose();
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="cancel"
              onPress={() => {
                onClose();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
