import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {DateGrid} from './DateGrid';
import {useFiles} from './hooks/useFiles';
import {GalleryItem} from './types';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export const Gallery: React.FunctionComponent = () => {
  const files = useFiles();

  // creates an array of arrays to group the files based on date.
  // assumes server returns files ordered by day
  const data = useMemo(() => {
    let currentGroup: GalleryItem[] = [];
    const groupedFiles: GalleryItem[][] = [];
    files.forEach((value, index) => {
      if (index === 0 || value.createdDate === files[index - 1].createdDate) {
        currentGroup.push(value);
      } else {
        groupedFiles.push(currentGroup);
        currentGroup = [value];
      }

      if (index === files.length - 1) {
        groupedFiles.push(currentGroup);
      }
    });
    return groupedFiles;
  }, [files]);

  return (
    <View style={styles.homeContent}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DateGrid date={item[0].createdDate} items={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
