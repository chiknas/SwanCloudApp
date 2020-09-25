import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextProps} from './Themed';

const styles = StyleSheet.create({
  font: {
    fontFamily: 'space-mono',
  },
});

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, styles.font]} />;
}
