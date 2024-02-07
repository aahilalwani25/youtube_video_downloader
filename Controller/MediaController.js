import RNFetchBlob from 'rn-fetch-blob';
import ytdl from 'react-native-ytdl';
import { Platform } from 'react-native';

export default class MediaController {
  async downloadVideo(link) {
    let isDownloaded = false;

    const cacheDir = RNFetchBlob.fs.dirs.DownloadDir; //save file in DownloadDirectory
    //const date = new Date();
    const filename = link.split('/').pop();
    const path = `${cacheDir}/${filename}`;

    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: path,
        appendExt: 'mp4',
      },
      android: {
        fileCache: true,
        path: path,
        //appendExt: 'mp4',
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'File',
        },
      },
    });

    RNFetchBlob.config(configOptions)
      .fetch('GET', link+'.mp4', {
        //some headers//
      })
      .then(res => {
        console.log(res.path());
        isDownloaded = true;
      });

    // const youtubeURL = link;
    // const urls = await ytdl(youtubeURL, {quality: 'highestaudio'});
    // console.log(urls);

    return isDownloaded;
  }
}
