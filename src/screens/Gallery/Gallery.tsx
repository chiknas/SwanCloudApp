import Colors from 'constants/Colors';
import useColorScheme from 'hooks/useColorScheme';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AllFiles} from './AllFiles';
import {GalleryFilterRow} from './GalleryFilterRow';
import {UncategorizedFiles} from './UncategorizedFiles';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
});

export const Gallery: React.FunctionComponent = () => {
  const [uncategorizedOnly, setUncategorizedOnly] = useState<boolean>(false);
  const backgroundColor = {
    backgroundColor: Colors[useColorScheme()].background,
  };

  return (
    <View style={[styles.homeContent, backgroundColor]}>
      <GalleryFilterRow
        uncategorizedOnly={uncategorizedOnly}
        setUncategorizedOnly={setUncategorizedOnly}
      />
      {uncategorizedOnly ? <UncategorizedFiles /> : <AllFiles />}
    </View>
  );
};
