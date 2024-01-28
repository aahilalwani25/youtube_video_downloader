export default class PermissionsController {
  async requestPermission(PermissionsAndroid) {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Youtube Video Downloader Permission',
        message:
          'This app needs access to your storage in order to download Youtube Videos.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
        buttonNeutral: 'Ask me Later',
      },
    );

    return granted;
  }
}
