import {GalleryComponent} from 'screens/Gallery/components/GalleryComponent';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFiles} from './hooks/useFiles';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
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
      {filesResponse && filesResponse.nodes && (
        <GalleryComponent
          items={filesResponse.nodes}
          onEndReached={getNewPage}
        />
      )}
    </View>
  );
};
