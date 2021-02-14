import {Card} from 'components/Card';
import {Text, ViewProps} from 'components/Themed';
import React, {useState} from 'react';
import MediaAlbum from 'services/MediaAlbum/MediaAlbum';

const mediaAlbum = new MediaAlbum();

export type UnsyncedFotosCardProps = {
  lastUploadedTimestamp: number;
};

export const UnsyncedFotosCard: React.FunctionComponent<
  UnsyncedFotosCardProps & ViewProps
> = ({lastUploadedTimestamp, ...props}) => {
  const [numberOfPendingImages, setNumberOfPendingImages] = useState<number>(0);

  mediaAlbum.getLatestMedia(lastUploadedTimestamp.toString()).then((image) => {
    setNumberOfPendingImages(image.edges.length);
  });

  return (
    <Card title="Unsynced fotos" {...props}>
      <Text>{`${numberOfPendingImages}`}</Text>
    </Card>
  );
};
