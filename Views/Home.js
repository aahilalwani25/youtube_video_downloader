import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../global/styles/styles';
import ProfileCard from '../components/ProfileCard';
import TextBox from '../components/TextBox';
import PermissionsController from '../Controller/PermissionsController';
import ToastMessage from '../components/ToastMessage';
import {setLink, changeToastMessage} from '../Redux/Home/action';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import NavBar from '../components/NavBar';
import MediaController from '../Controller/MediaController';

class Home extends Component {
  constructor(props) {
    super(props);
    this.permissionController = new PermissionsController();
  }

  render() {
    const {email, name, photo} = this.props.route.params;
    const {link} = this.props;
    return (
      <View style={[styles.themeColor, {flex: 1, alignItems: 'center'}]}>
        <NavBar>
          <View
            style={{
              //flex: 0.07,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Text style={{color: 'black', fontSize: 30, left: 10}}>
              Dashboard
            </Text>

            {/* settings navigation */}
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                right: 20,
              }}>
              <TouchableOpacity onPress={() => console.log(email)}>
                <ProfileCard photo={photo} />
              </TouchableOpacity>
              <Text style={{color: 'black'}}>{name}</Text>
            </View>
          </View>
        </NavBar>

        <View
          style={{
            //flex: 0.2,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            top: 10,
          }}>
          <TextBox
            placeholder={'Paste Youtube Link'}
            value={link}
            onChangeText={text => {
              this.props.setLink(text);
              //console.log(this.props.link)
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              const validPathDomains =
                /^https?:\/\/(youtu\.be\/|(www\.)?youtube.com\/(embed|v|shorts)\/)/;
              if (!this.props.link.match(validPathDomains)) {
                this.props.changeToastMessage(
                  true,
                  'Invalid Link Format',
                  'error',
                );
              } else {
                const mediaController = new MediaController();
                mediaController
                  .downloadVideo(this.props.link)
                  .then(res => {
                    this.props.changeToastMessage(
                      true,
                      res.message.toString(),
                      res.type,
                    );
                    
                  })
                  .catch(error => {
                    console.error('Error downloading video:', error);
                    this.props.changeToastMessage(
                      true,
                      'An error occurred while downloading video',
                      'error',
                    );
                  });
              }
            }}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              top: 20,
              justifyContent: 'center',
              color: 'black',
              backgroundColor: 'blue',
              width: 300,
              borderRadius: 40,
              height: 60,
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flex:2}}>
            <Text>Hellp</Text>
          </View> */}

        {this.props.showToastMessage && (
          <View style={{alignItems: 'center'}}>
            <ToastMessage
              type={this.props.toastMessageType}
              message={this.props.toastMessageContent}
            />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    link: state.homeReducer.link, //homeReducer is in the reducer file
    showToastMessage: state.homeReducer.showToastMessage,
    toastMessageContent: state.homeReducer.toastMessageContent,
    toastMessageType: state.homeReducer.toastMessageType,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({setLink}, dispatch);
// }

export default connect(mapStateToProps, {setLink, changeToastMessage})(Home);
