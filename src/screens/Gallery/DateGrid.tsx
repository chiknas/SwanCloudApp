import {View} from 'components/Themed';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {FileThumbnail} from './FileThumbnail';
import {GalleryItem} from './types';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {paddingTop: 20, backgroundColor: '#f2f2f2'},
  date: {padding: 20},
});

export type DateGridProps = {
  date: string;
  items: GalleryItem[];
};

export const DateGrid: React.FunctionComponent<DateGridProps> = ({
  date,
  items,
}) => {
  const gridColumns = 4;

  const data = useMemo(() => {
    // how many items we need to fill all boxes for all columns.
    const missingItems = gridColumns - (items.length % gridColumns);
    const emptyItem: GalleryItem = {
      id: '',
      path: '',
      fileName: '',
      createdDate: '',
      thumbnail: '',
    };
    const missingData =
      missingItems < gridColumns ? Array(missingItems).fill(emptyItem) : [];
    return [...items, ...missingData];
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(date).format('Do MMMM YYYY')}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <FileThumbnail item={item} />}
        numColumns={gridColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
