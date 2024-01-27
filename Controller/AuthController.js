import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import process from 'process';

class AuthController {
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

  async signinWithGoogle(google_sign_in, statusCodes) {
    let userInfo = null;
    try {
      await google_sign_in.hasPlayServices();
      userInfo = await google_sign_in.signIn();

      //store user info of google in db by api call
      let res = await axios.post(
        `http://${process.env.IP_ADDRESS}:${process.env.PORT}/signin/google/`,
        {
          idToken: userInfo.idToken,
          name: userInfo.user.name,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
        },
      );

      if (res.status === 201) {
        res = res.data;
        this.storeUserInfoInLocalStorage(userInfo);
        return {
          message: res['message'],
          res,
        };
      }

      if (res.status === 400 || res.status === 500) {
        res = res.data;
        return {
          res,
          error: true,
        };
      }

      res = res.data;

      return {
        error: true,
      };
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

export default AuthController;
