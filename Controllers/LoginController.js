class LoginController {
  isSignedIn() {}

  async signinWithGoogle(google_sign_in, statusCodes) {
    const userInfo = null;
    try {
      await google_sign_in.hasPlayServices();
      userInfo = await google_sign_in.signIn();
      return userInfo;
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

module.exports = LoginController;
