import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, ViewProps} from './Themed';

export type CardProps = {
  title?: string;
  onPress?: () => void;
};

const CardContent: React.FunctionComponent<PropsWithChildren<
  CardProps & ViewProps
>> = ({title, style, children, ...props}) => {
  const backgroundColor = {
    backgroundColor: Colors[useColorScheme()].secondary,
    borderColor: Colors[useColorScheme()].secondary,
  };

  return (
    <View style={[styles.square, backgroundColor, style]} {...props}>
      {title && (
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}

      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export const Card: React.FunctionComponent<PropsWithChildren<
  CardProps & ViewProps
>> = ({title, onPress, style, children, ...props}) => {
  return (
    <>
      {onPress ? (
        <TouchableOpacity
          onPress={() => {
            onPress && onPress();
          }}>
          <CardContent title={title} style={style} {...props}>
            {children}
          </CardContent>
        </TouchableOpacity>
      ) : (
        <CardContent title={title} style={style} {...props}>
          {children}
        </CardContent>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  square: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    elevation: 15,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  title: {
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
});
