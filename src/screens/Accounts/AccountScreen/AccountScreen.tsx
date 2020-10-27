/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'components/Themed';
import {AccountScreenProps} from 'navigation/types';
import {Title} from 'components/Title';
import {Divider} from 'components/Divider';
import {AccountName} from './AccountName';
import {AccountUsername} from './AccountUsername';
import {AccountPassword} from './AccountPassword';
import {AccountAddress} from './AccountAddress';
import {AccountPort} from './AccountPort';
import {SaveButton} from './SaveButton';
import {ScrollView} from 'react-native-gesture-handler';
import {Account} from 'services/AsyncStorage/type';
import {ConnectionTestButton} from './ConnectionTestButton';
import {AccountTimestamp} from './AccountTimestamp';

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  form_item: {
    marginTop: 10,
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontal_wrapper_item: {
    flex: 1,
  },
});

export type AddAccountFieldProps = {
  setForm: (value: React.SetStateAction<Account>) => void;
  form?: Account;
  screenProps?: AccountScreenProps;
};

export const AccountScreen: React.FunctionComponent<AccountScreenProps> = (
  screenProps,
) => {
  const [form, setForm] = useState<Account>({
    name: '',
    address: '',
    port: 21,
    username: '',
    password: '',
    lastUploadedTimestamp: new Date().getTime(),
  });

  return (
    <View style={styles.form}>
      <ScrollView>
        <AccountName setForm={setForm} />
        <AccountUsername setForm={setForm} style={styles.form_item} />
        <AccountPassword setForm={setForm} style={styles.form_item} />

        <Divider style={{marginVertical: 20}} />
        <Title>Connection</Title>

        <View style={[styles.form_item, styles.horizontal_wrapper]}>
          <AccountAddress setForm={setForm} style={{flex: 2}} />
          <AccountPort setForm={setForm} style={{flex: 1, marginLeft: 5}} />
        </View>
        <AccountTimestamp setForm={setForm} style={styles.form_item} />
      </ScrollView>
      <View
        style={[
          styles.form_item,
          styles.horizontal_wrapper,
          {justifyContent: 'flex-end'},
        ]}>
        <View style={{marginRight: 10}}>
          <ConnectionTestButton account={form} />
        </View>
        <SaveButton setForm={setForm} screenProps={screenProps} form={form} />
      </View>
    </View>
  );
};
