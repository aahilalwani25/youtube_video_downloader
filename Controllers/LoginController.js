import AsyncStorage from '@react-native-async-storage/async-storage';


class LoginController {

  async signOut(google_sign_in,statusCodes){
    try {
      await google_sign_in.revokeAccess();
      await google_sign_in.signOut();
      
      AsyncStorage.clear();
      return("success");
    } catch (error) {
      if(error.code== statusCodes.SIGN_IN_REQUIRED){
        return ("signin required")
      }
    }
  };

  //check if user is already signed in or not
  isSignedIn() {

  }

  storeUserInfo(userInfo){
    //decode into json
    //let userObj = JSON.parse(userInfo.toString());
    AsyncStorage.setItem("idToken",userInfo.idToken);
    AsyncStorage.setItem("email",userInfo.user.email);
    AsyncStorage.setItem("name",userInfo.user.name);
    AsyncStorage.setItem("photo",userInfo.user.photo);

    AsyncStorage.multiGet(["email","name"],(err,arr)=>{
      console.log(arr)
    });
  }


  async signinWithGoogle(google_sign_in, statusCodes) {
    let userInfo = null;
    try {
      await google_sign_in.hasPlayServices();
      userInfo = await google_sign_in.signIn();
      this.storeUserInfo(userInfo);
      return "success";
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

export default LoginController;
