import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@env';
import AuthController from '../Controllers/AuthController.mjs';
import styles from '../global/styles/styles';
import HeaderText from '../components/HeaderText';
import ToastMessage from '../components/ToastMessage';
//console.log(WEB_CLIENT_ID)
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,

});

//steps:
//1. go to google developer console
//2. go to API and services>credentials
//3. make web client ID by selecting web app
//4. make android client id by selecting android app
//for SHA-1 use command "cd android/app" and "keytool -keystore debug.keystore -list -v"
//for keystore password, simply press enter key
//for package name, check on mainapplication.kt or mainapplication.java (line 1)

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.loginController = new AuthController();

    this.state = {
      isGoogleButtonLoading: false,
      toastMessageShow: false,
      messageType: '', // success / warning / error
      messageContent: '',
    };
  }

  // Function to show toast message
  showToastMessage(type, content) {
    this.setState({
      messageType: type,
      messageContent: content,
      toastMessageShow: true,
    });

    // Hide the toast message after 3 seconds
    setTimeout(() => {
      this.setState({
        toastMessageShow: false,
      });
    }, 3000);
  }

  render() {
    return (
      <View style={[styles.themeColor, {flex: 1}]}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            //style={{height: 100, width: 300}}
            source={require('../assets/images/youtube_downloader_logo_2.png')}
          />

          <HeaderText
            styles={{fontWeight: 'bold', textAlign: 'center'}}
            text="YOUTUBE VIDEO DOWNLOADER"
          />
        </View>

        {/* Login buttons */}
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <TouchableOpacity
              onPress={async () => {
                this.loginController
                  .signinWithGoogle(GoogleSignin, statusCodes)
                  .then(message => {
                    if (message == 'success') {
                      if (message === 'success') {
                        this.showToastMessage(
                          'success',
                          'Successfully logged in',
                        );
                      }
                    }
                  });
                this.setState({
                  isGoogleButtonLoading: true,
                });
                setTimeout(
                  () =>
                    this.setState({
                      isGoogleButtonLoading: false,
                    }),
                  2000,
                );
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: 'white',
                width: 200,
                height: 50,
              }}>
              {!this.state.isGoogleButtonLoading ? (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: 20, height: 20, right: 10}}
                    source={require('../assets/images/google_logo.png')}
                  />
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Login with Google
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <ActivityIndicator size={'large'} color={'black'} />
                </View>
              )}
            </TouchableOpacity>

            {this.state.toastMessageShow ? (
              <View style={{alignItems: 'center'}}>
                <ToastMessage
                  type={this.state.messageType}
                  message={this.state.messageContent}
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
