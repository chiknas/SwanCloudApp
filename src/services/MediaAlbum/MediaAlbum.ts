import CameraRoll from '@react-native-community/cameraroll';

export default class MediaAlbum {
  getLatestMedia(time: string): Promise<CameraRoll.PhotoIdentifiersPage> {
    return CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
      fromTime: parseInt(time, 10),
    });
  }
}
