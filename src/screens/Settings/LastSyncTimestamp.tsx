import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextField} from 'components/TextField';
import {View, ViewProps} from 'components/Themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Settings} from 'services/AsyncStorage/type';
import {updateLastSyncTimestamp} from 'services/AsyncStorage/settingsHelpers';
import {Title} from 'components/Title';

export type LastSyncTimestampProps = {
  settings: Settings;
};

export const LastSyncTimestamp: React.FunctionComponent<
  LastSyncTimestampProps & ViewProps
> = ({settings, ...viewProps}) => {
  const currentDate = new Date(settings.lastUploadedTimestamp);
  const [date, setDate] = useState<Date>(currentDate);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    updateLastSyncTimestamp(date.getTime());
  }, [date, settings]);

  return (
    <TouchableOpacity
      onPress={() => {
        setShow(true);
      }}>
      <View {...viewProps} pointerEvents="none">
        {show && date && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="spinner"
            onChange={(event: Event, selectedDate?: Date) => {
              selectedDate && setDate(selectedDate);
              setShow(false);
            }}
          />
        )}
        <Title>Last Sync Date</Title>
        <TextField
          label="Last sync"
          defaultValue={date.toDateString()}
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};
