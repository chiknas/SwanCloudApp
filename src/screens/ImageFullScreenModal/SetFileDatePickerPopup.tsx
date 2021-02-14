import React from 'react';
import {SWAN_SERVER_URL} from '@env';
import {isServerReachable} from 'services/FileSyncTask';
import {GalleryItem} from 'screens/Gallery/types';
import {DatePickerPopup} from 'components/DatePickerPopup';

const setFileDate = (file: GalleryItem, date: Date) => {
  isServerReachable().then((isServerUp) => {
    if (isServerUp) {
      fetch(`${SWAN_SERVER_URL}/file/set-date`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: file.id,
          creationDate: date.toISOString(),
        }),
      }).catch((error) => {
        console.error(error);
      });
    }
  });
};

export type SetFileDateModalProps = {
  file: GalleryItem;
  onClose?: () => void;
};

export const SetFileDatePickerPopup: React.FunctionComponent<SetFileDateModalProps> = ({
  file,
  onClose,
}) => {
  return (
    <DatePickerPopup
      onChange={(selectedDate) => setFileDate(file, selectedDate)}
      onClose={onClose}
    />
  );
};
