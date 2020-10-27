import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextField} from 'components/TextField';
import {View, ViewProps} from 'components/Themed';
import {AddAccountFieldProps} from './AccountScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStorageItem} from 'services/AsyncStorage/storageHelpers';
import {Account, STORAGE_ITEMS} from 'services/AsyncStorage/type';

export const AccountTimestamp: React.FunctionComponent<
  AddAccountFieldProps & ViewProps
> = ({setForm, ...viewProps}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (selectedDate?: Date) => {
    selectedDate && setDate(selectedDate);
    selectedDate &&
      setForm((form) => {
        form.lastUploadedTimestamp = selectedDate.getTime();
        return form;
      });
    setShow(false);
  };

  useEffect(() => {
    getStorageItem(STORAGE_ITEMS.ACCOUNT).then((account: Account) => {
      onChange(new Date(account.lastUploadedTimestamp));
    });
  }, [setForm]);

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
