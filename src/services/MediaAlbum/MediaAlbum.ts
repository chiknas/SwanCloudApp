import CameraRoll from '@react-native-community/cameraroll';
import {File} from './types';

export default class MediaAlbum {
  getLatestMedia(time: string): Promise<CameraRoll.PhotoIdentifiersPage> {
    return CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
      fromTime: parseInt(time, 10),
      include: ['filename'],
    });
  }

  edgeToFile(edge: CameraRoll.PhotoIdentifier): File {
    return {
      filename: edge.node.image.filename,
      uri: edge.node.image.uri.replace('file://', ''),
    };
  }
}
