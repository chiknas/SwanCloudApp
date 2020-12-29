import {View} from 'components/Themed';
import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {FileThumbnail} from './FileThumbnail';
import {GalleryItem} from './types';

const styles = StyleSheet.create({
  container: {paddingTop: 20},
  title: {padding: 20},
});

export type DateGridProps = {
  title: string;
  items: GalleryItem[];
};

export const DateGrid: React.FunctionComponent<DateGridProps> = ({
  title,
  items,
}) => {
  const gridColumns = 4;

  const data = useMemo(() => {
    const missingItems = gridColumns - (items.length % gridColumns);
    const emptyItem: GalleryItem = {
      thumbnail: '',
    };
    const missingData =
      missingItems < gridColumns ? Array(missingItems).fill(emptyItem) : [];
    return [...items, ...missingData];
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <FileThumbnail item={item} />}
        numColumns={gridColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
