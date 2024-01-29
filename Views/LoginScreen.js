import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  changeMessageContent,
  changeMessageType,
  googleButtonLoadingFalse,
  googleButtonLoadingTrue,
  showToastMessageFalse,
  showToastMessageTrue,
} from '../Redux/Login/action';
import * as authActions from '../Redux/Login/action';
import {WEB_CLIENT_ID} from '@env';
import AuthController from '../Controller/AuthController';
import styles from '../global/styles/styles';
import HeaderText from '../components/HeaderText';
import ToastMessage from '../components/ToastMessage';
import {bindActionCreators} from 'redux';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.loginController = new AuthController();

    //binding action creators (authActions imported)
    //this.actions = bindActionCreators(authActions, this.props.dispatch);
  }

  // Function to show toast message
  showToastMessage(type, content) {
    changeMessageType(type);
    changeMessageContent(content);
    showToastMessageTrue();

    // Hide the toast message after 3 seconds
    setTimeout(() => {
      showToastMessageFalse();
    }, 2000);
  }

  render() {
    return (
      <View style={[styles.themeColor, {flex: 1}]}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/youtube_downloader_logo_2.png')}
          />
          <HeaderText
            styles={[{fontWeight: 'bold', textAlign: 'center'}]}
            text="YOUTUBE VIDEO DOWNLOADER"
          />
        </View>

        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <TouchableOpacity
              onPress={async () => {
                googleButtonLoadingTrue();
                this.loginController
                  .signinWithGoogle(GoogleSignin, statusCodes)
                  .then(res => {
                    console.log(res);
                    if (
                      res.message == 'Signed up Successfully' ||
                      res.message == 'Logged in'
                    ) {
                      this.showToastMessage('success', res.message);
                      this.props.navigation.navigate('dashboard', res);
                      googleButtonLoadingFalse();
                    }
                  })
                  .catch(err => {
                    this.showToastMessage('error', err);
                    googleButtonLoadingFalse();
                  });
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
              {!this.props.isGoogleButtonLoading ? (
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

            {this.props.toastMessageShow && (
              <View style={{alignItems: 'center'}}>
                <ToastMessage
                  type={this.props.messageType}
                  message={this.props.messageContent}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

//state of the component is defined here
const mapStateToProps = state => ({
  isGoogleButtonLoading: state.isGoogleButtonLoading,
  toastMessageShow: state.toastMessageShow,
  messageType: state.messageType,
  messageContent: state.messageContent,
});

//all the actions is dispatched here
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeMessageType,
      changeMessageContent,
      googleButtonLoadingFalse,
      googleButtonLoadingTrue,
      showToastMessageFalse,
      showToastMessageTrue,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginScreen);
