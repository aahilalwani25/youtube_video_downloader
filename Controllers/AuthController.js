import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleUser from '../Model/GoogleUsers.js';
//import axios from 'axios';


export default class AuthController {
  async signOut(google_sign_in, statusCodes) {
    try {
      await google_sign_in.revokeAccess();
      await google_sign_in.signOut();

      AsyncStorage.clear();
      return 'success';
    } catch (error) {
      if (error.code == statusCodes.SIGN_IN_REQUIRED) {
        return 'signin required';
      }
    }
  }

  //check if user is already signed in or not
  async isSignedIn(google_sign_in) {
    return await google_sign_in.isSignedIn();
  }

  storeUserInfoInLocalStorage(userInfo) {
    AsyncStorage.setItem('idToken', userInfo.idToken);
    AsyncStorage.setItem('email', userInfo.user.email);
    AsyncStorage.setItem('name', userInfo.user.name);
    AsyncStorage.setItem('photo', userInfo.user.photo);
  }

  async storeUserInfoIntoDb(email, name, photo, idToken) {
    await GoogleUser.findOne({
      where: {
        email,
      },
    }).then(async value => {
      if (value.email) {
        throw new Error('This account has been registered before');
      } else {
        const google_user = await GoogleUser.create({
          name,
          email,
          photo,
          idToken,
        });

        google_user.save();
      }
    });

    return {
      auth: true,
      user: {
        name: name,
        email: email,
        photo: photo,
        idToken: idToken,
      },
    };
  }

  async signinWithGoogle(google_sign_in, statusCodes) {
    let userInfo = null;
    try {
      await google_sign_in.hasPlayServices();
      userInfo = await google_sign_in.signIn();
      
      //store user info in db by api call
      //axios.post('')
      return 'success';
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //sign in has been cancelled by the user
        return statusCodes.SIGN_IN_CANCELLED;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        return statusCodes.IN_PROGRESS;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        return statusCodes.PLAY_SERVICES_NOT_AVAILABLE;
      } else {
        // some other error happened
        throw new Error(error);
      }
    }
  }
}
