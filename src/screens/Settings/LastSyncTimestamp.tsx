import React, {useCallback, useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextField} from 'components/TextField';
import {View, ViewProps} from 'components/Themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {Settings, STORAGE_ITEMS} from 'services/AsyncStorage/type';

export type LastSyncTimestampProps = {
  settings: Settings;
  setSettings: (value: React.SetStateAction<Settings>) => void;
};

export const LastSyncTimestamp: React.FunctionComponent<
  LastSyncTimestampProps & ViewProps
> = ({setSettings, ...viewProps}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = useCallback((selectedDate?: Date) => {
    if (selectedDate && selectedDate?.getFullYear() > 1980) {
      selectedDate && setDate(selectedDate);
      selectedDate &&
        setSettings((settings) => {
          settings.lastUploadedTimestamp = selectedDate.getTime();
          return settings;
        });
      setShow(false);
    }
  }, []);

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.SETTINGS).then((settings: Settings) => {
      onChange(new Date(settings.lastUploadedTimestamp));
    });
  }, [setSettings]);

  return (
    <TouchableOpacity
      onPress={() => {
        setShow(true);
      }}>
      <View {...viewProps} pointerEvents="none">
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="spinner"
            onChange={(event: Event, selectedDate?: Date) => {
              onChange(selectedDate);
            }}
          />
        )}
        <TextField
          label="Last sync"
          defaultValue={date.toDateString()}
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};
