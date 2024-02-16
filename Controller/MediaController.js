import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';
import ytdl from 'react-native-ytdl';
import RNFS from 'react-native-fs';
//import {v4} from 'uuid'; // Import UUID generator

export default class MediaController {
  generateUniqueId() {
    const existingIDs = ['AA1111', 'XY1234'];
    const getRandomLetters = (length = 1) =>
      Array(length)
        .fill()
        .map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
        .join('');
    const getRandomDigits = (length = 1) =>
      Array(length)
        .fill()
        .map(e => Math.floor(Math.random() * 10))
        .join('');
    const generateUniqueID = () => {
      let id = getRandomLetters(2) + getRandomDigits(4);
      while (existingIDs.includes(id))
        id = getRandomLetters(2) + getRandomDigits(4);
      return id;  
    };
    const newID = generateUniqueID();

    console.log(newID);
    return newID;
  }


  async downloadVideo(link) {
    try {
      const url = link; // Replace VIDEO_ID with the actual video ID
      const videoInfo = await ytdl.getBasicInfo(url);
      const highestQualityFormat = ytdl.chooseFormat(videoInfo.formats, {
        quality: 'highest',
      });

      if (!highestQualityFormat) {
        console.error('No video format found');
        return {
          type: 'error',
          message: 'No video file format',
        };
      }

      const id = this.generateUniqueId(); // Generate a unique ID
      const downloadFilePath = `${RNFS.DownloadDirectoryPath}/${id}.mp4`;
      const galleryPath =
        Platform.select({
          android: RNFS.DownloadDirectoryPath,
          ios: RNFS.LibraryDirectoryPath,
        }) + '/CameraRoll';

      const downloadProgressCallback = (progress, totalBytes) => {
        const percentage = (progress / totalBytes) * 100;
        console.log(`Progress: ${percentage}%`);
      };

      await RNFS.downloadFile({
        fromUrl: highestQualityFormat.url,
        toFile: downloadFilePath,
        begin: downloadProgressCallback,
        background: true, // Enable downloading in the background (iOS only)
        discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      }).promise;

      console.log('File downloaded!', downloadFilePath);

      // // Check and request permission for Android
      // if (Platform.OS === 'android') {
      //   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      //   if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      //     console.error('Permission denied');
      //     return null;
      //   }
      // }

      // Move the downloaded file to the gallery directory
      await RNFS.moveFile(downloadFilePath, `${galleryPath}/${id}.mp4`);

      console.log('File moved to gallery!');

      // Show notification
      PushNotification.localNotification({
        title: 'Download Complete',
        message: 'The video has been downloaded and saved to your gallery.',
      });

      return {
        type: 'success',
        message: 'The video has been downloaded and saved to your gallery',
      };
    } catch (error) {
      console.error('Download error:', error);
      return {
        type: 'error',
        message: error,
      };
    }
  }
}
