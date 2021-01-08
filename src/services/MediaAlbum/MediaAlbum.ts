import CameraRoll from '@react-native-community/cameraroll';
import {File} from './types';

export default class MediaAlbum {
  getLatestMedia(time: string): Promise<CameraRoll.PhotoIdentifiersPage> {
    return CameraRoll.getPhotos({
      first: 10000,
      assetType: 'All',
      fromTime: parseInt(time, 10),
      include: ['filename'],
    });
  }

  edgeToFile(edge: CameraRoll.PhotoIdentifier): File {
    return {
      filename: edge.node.image.filename,
      uri: edge.node.image.uri.replace('file://', ''),
      fileType: edge.node.type,
      // CameraRoll returns the time in this format 1603030027.898 for some reason.
      // this refactors it to a normal timestamp 1603030027898
      timestamp: parseInt(edge.node.timestamp.toString(), 10) * 1000,
    };
  }
}
