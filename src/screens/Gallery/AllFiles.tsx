import {GalleryComponent} from 'screens/Gallery/components/GalleryComponent';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useFiles} from './hooks/useFiles';
import {Text} from 'components/Themed';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  emptyServerMessage: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

export const AllFiles: React.FunctionComponent = () => {
  const [cursor, setCursor] = useState<string>();
  const filesResponse = useFiles(cursor);

  const getNewPage = useCallback(() => {
    if (
      filesResponse &&
      filesResponse.nextCursor &&
      filesResponse.nextCursor !== cursor
    ) {
      setCursor(filesResponse.nextCursor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesResponse]);

  return (
    <View style={styles.homeContent}>
      {filesResponse ? (
        filesResponse.nodes.length > 0 ? (
          <GalleryComponent
            items={filesResponse.nodes}
            onEndReached={getNewPage}
          />
        ) : (
          <Text style={styles.emptyServerMessage}>
            No files currently on the server
          </Text>
        )
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};
