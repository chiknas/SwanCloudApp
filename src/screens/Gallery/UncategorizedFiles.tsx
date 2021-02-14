import {GalleryComponent} from 'screens/Gallery/components/GalleryComponent';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useUncategorizedFiles} from './hooks/useUncategorizedFiles';
import {Text} from 'components/Themed';
import {isServerReachable} from 'services/FileSyncTask';
import useColorScheme from 'hooks/useColorScheme';
import Colors from 'constants/Colors';

const styles = StyleSheet.create({
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  emptyServerMessage: {
    alignSelf: 'center',
    color: '#a6a6a6',
    fontSize: 20,
  },
});

export const UncategorizedFiles: React.FunctionComponent = () => {
  const [cursor, setCursor] = useState<string>();
  const [serverStatus, setServerStatus] = useState<boolean>(true);
  const filesResponse = useUncategorizedFiles(cursor);
  const colorScheme = useColorScheme();

  // test connection to the server when rendering the component
  useEffect(() => {
    isServerReachable().then((status) => {
      setServerStatus(status);
    });
  }, []);

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
      {serverStatus ? (
        filesResponse ? (
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
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme].secondary}
          />
        )
      ) : (
        <Text style={styles.emptyServerMessage}>Server not reachable</Text>
      )}
    </View>
  );
};
