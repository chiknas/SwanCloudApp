import {Card} from 'components/Card';
import {DatePickerPopup} from 'components/DatePickerPopup';
import {Text, ViewProps} from 'components/Themed';
import React, {useState} from 'react';
import {updateLastSyncTimestamp} from 'services/AsyncStorage/settingsHelpers';

export type LastUploadedTimestampProps = {
  lastUploadedTimestamp: number;
  onUpdate: () => void;
};

export const LastUploadedTimestamp: React.FunctionComponent<
  LastUploadedTimestampProps & ViewProps
> = ({lastUploadedTimestamp, onUpdate, ...props}) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  return (
    <>
      <Card
        title="Last Uploaded Timestamp"
        onPress={() => setDatePickerVisible(true)}
        {...props}>
        <Text>{`${new Date(lastUploadedTimestamp).toLocaleDateString()}`}</Text>
      </Card>
      {datePickerVisible && (
        <DatePickerPopup
          onChange={async (selectedDate) => {
            await updateLastSyncTimestamp(selectedDate.getTime());
            onUpdate();
          }}
          onClose={() => setDatePickerVisible(false)}
        />
      )}
    </>
  );
};
