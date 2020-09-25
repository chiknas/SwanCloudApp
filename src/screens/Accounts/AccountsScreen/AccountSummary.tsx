import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Account} from '../types';
import {Title} from '../../../components/Title';

const styles = StyleSheet.create({
  account_wrapper: {
    display: 'flex',
    marginTop: 10,
    padding: 20,
  },
  account: {
    flex: 1,
    marginLeft: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export type AccountSummaryProps = {
  account: Account;
};

export const AccountSummary: React.FunctionComponent<AccountSummaryProps> = ({
  account,
}) => {
  return (
    <View style={styles.account_wrapper}>
      <View style={styles.horizontal_wrapper}>
        <Image
          source={require('../../../assets/images/swan.png')}
          style={styles.image}
        />
        <View style={styles.account}>
          <Title>{account.text}</Title>
          <Text>
            {account.address}:{account.port}
          </Text>
        </View>
      </View>
    </View>
  );
};
