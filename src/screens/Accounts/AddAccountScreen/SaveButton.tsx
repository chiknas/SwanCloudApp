import React from 'react';
import {AddAccountFieldProps} from './AddAccountScreen';
import {View} from '/components/Themed';
import {Button, StyleSheet} from 'react-native';
import {database} from '/services/Database/Database';

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
    database.then((db) => {
      db.transaction((txn) => {
        txn.executeSql(
          `INSERT INTO account(text, address, port, username, password)
        VALUES ('${form.name}', '${form.address}', ${form.port}, '${form.username}', '${form.password}')`,
          [],
          function () {
            screenProps?.navigation.navigate('AccountsScreen', {refresh: true});
          },
        );
      });
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
