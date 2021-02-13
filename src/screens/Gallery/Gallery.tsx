import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AllFiles} from './AllFiles';
import {GalleryFilterRow} from './GalleryFilterRow';
import {UncategorizedFiles} from './UncategorizedFiles';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export const Gallery: React.FunctionComponent = () => {
  const [uncategorizedOnly, setUncategorizedOnly] = useState<boolean>(false);

  return (
    <View style={styles.homeContent}>
      <GalleryFilterRow
        uncategorizedOnly={uncategorizedOnly}
        setUncategorizedOnly={setUncategorizedOnly}
      />
      {uncategorizedOnly ? <UncategorizedFiles /> : <AllFiles />}
    </View>
  );
};
