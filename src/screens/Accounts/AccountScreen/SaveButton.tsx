import React from 'react';
import {AddAccountFieldProps} from './AccountScreen';
import {View} from '/components/Themed';
import {Button, StyleSheet} from 'react-native';
import {database} from '/services/Database/Database';
import {AccountTableFields} from 'services/Database/Tables';

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
          `INSERT INTO account(
            ${AccountTableFields.TEXT}, ${AccountTableFields.ADDRESS}, ${
            AccountTableFields.PORT
          }, 
            ${AccountTableFields.USERNAME}, ${AccountTableFields.PASSWORD}, ${
            AccountTableFields.LAST_UPLOADED_TIMESTAMP
          })
        VALUES ('${form.name}', '${form.address}', ${form.port}, '${
            form.username
          }', '${form.password}', '${new Date().getTime()}')`,
          [],
          function () {
            screenProps?.navigation.navigate('AccountScreen');
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
