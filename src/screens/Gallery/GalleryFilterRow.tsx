/* eslint-disable react-native/no-inline-styles */
import {Title} from 'components/Title';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  horizontal_wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontal_item: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderColor: 'black',
  },
});

export type GalleryFilterRowProps = {
  uncategorizedOnly: boolean;
  setUncategorizedOnly: (value: boolean) => void;
};

export const GalleryFilterRow: React.FunctionComponent<GalleryFilterRowProps> = ({
  uncategorizedOnly,
  setUncategorizedOnly,
}) => {
  return (
    <View style={styles.horizontal_wrapper}>
      <View
        style={{
          ...styles.horizontal_item,
          borderBottomWidth: uncategorizedOnly ? 0 : 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            setUncategorizedOnly(false);
          }}>
          <Title>All</Title>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.horizontal_item,
          borderBottomWidth: uncategorizedOnly ? 1 : 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            setUncategorizedOnly(true);
          }}>
          <Title>Uncategorized</Title>
        </TouchableOpacity>
      </View>
    </View>
  );
};
