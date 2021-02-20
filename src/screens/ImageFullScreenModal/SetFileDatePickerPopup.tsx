import React from 'react';
import {isServerReachable} from 'services/FileSyncTask';
import {GalleryItem} from 'screens/Gallery/types';
import {DatePickerPopup} from 'components/DatePickerPopup';
import {apiPost} from 'services/ApiFetch';

const setFileDate = (file: GalleryItem, date: Date) => {
  isServerReachable().then((isServerUp) => {
    if (isServerUp) {
      apiPost(
        '/file/set-date',
        JSON.stringify({
          fileId: file.id,
          creationDate: date.toISOString(),
        }),
      ).catch((error) => {
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
