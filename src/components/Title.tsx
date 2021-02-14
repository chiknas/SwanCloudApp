import React, {PropsWithChildren} from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text} from './Themed';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export const Title: React.FunctionComponent<PropsWithChildren<TextProps>> = ({
  children,
  ...textProps
}) => {
  return (
    <Text {...textProps} style={styles.title}>
      {children}
    </Text>
  );
};
