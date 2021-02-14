import React from 'react';
import {View} from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';

export type DatePickerPopupProps = {
  onChange: (selectedDate: Date) => void;
  onClose?: () => void;
};

export const DatePickerPopup: React.FunctionComponent<DatePickerPopupProps> = ({
  onChange,
  onClose,
}) => {
  return (
    <View>
      <DateTimePicker
        value={new Date()}
        mode={'date'}
        display="spinner"
        onChange={(event: Event, selectedDate?: Date) => {
          if (selectedDate) {
            onChange(selectedDate);
          }
          onClose && onClose();
        }}
      />
    </View>
  );
};
