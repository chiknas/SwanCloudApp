import CameraRoll from '@react-native-community/cameraroll';

export default class MediaAlbum {
  getMedia() {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
    }).then((fotos) => {
      fotos.edges.forEach((foto) => {
        console.log(foto.node.timestamp, foto.node.image);
      });
    });
  }
}
