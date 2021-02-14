import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {DateGrid} from 'screens/Gallery/DateGrid';
import {GalleryItem} from 'screens/Gallery/types';
import {View} from '../../../components/Themed';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
});

/*
 * creates an array of arrays to group the files based on date.
 * assumes server returns files ordered by day
 */
const groupFilesByDate = (files: GalleryItem[]): GalleryItem[][] => {
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
};

export type GalleryComponentProps = {
  items: GalleryItem[];
  onEndReached: () => void;
};

export const GalleryComponent: React.FunctionComponent<GalleryComponentProps> = ({
  items,
  onEndReached,
}) => {
  const [data, setData] = useState<GalleryItem[][]>();

  useEffect(() => {
    if (items) {
      const page = groupFilesByDate(items);
      setData((currentData) => {
        if (currentData && currentData.length > 0) {
          const currentLastGroupDate =
            currentData[currentData.length - 1][0].createdDate;
          const newFirstGroupDate = page[0][0].createdDate;
          // if the first group of the new page has the same data of the last group of the existing page merge them.
          if (currentLastGroupDate === newFirstGroupDate) {
            const mergedGroup = [
              ...currentData[currentData.length - 1],
              ...page[0],
            ];
            page[0] = mergedGroup;
            return [...currentData.slice(0, currentData.length - 2), ...page];
          }
          return [...currentData, ...page];
        }
        return page;
      });
    }
  }, [items]);

  return (
    <View style={styles.homeContent}>
      <FlatList
        data={data}
        onEndReached={() => {
          onEndReached();
        }}
        onEndReachedThreshold={50}
        renderItem={({item}) => (
          <DateGrid date={item[0].createdDate} items={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
