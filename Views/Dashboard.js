import React, {Component} from 'react';
import {View, Text, TextBase, Image, TouchableOpacity} from 'react-native';
import styles from '../global/styles/styles';
import ProfileCard from '../components/ProfileCard';
import TextBox from '../components/TextBox';
import Clipboard from '@react-native-clipboard/clipboard';
import PermissionsController from '../Controller/PermissionsController';
import { PermissionsAndroid } from "react-native";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.permissionController= new PermissionsController();
    this.state = {
      link: null,
    };
  }

  render() {
    const {email, name, photo} = this.props.route.params;
    return (
      <View style={[styles.themeColor, {flex: 1, alignItems: 'center'}]}>
        <View
          style={{
            //flex: 0.07,
            width: '100%',
            flex: 0.09,

            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundColor: 'white',
          }}>
          <Text style={{color: 'black', fontSize: 30, left: 10}}>
            Dashboard
          </Text>

          {/* settings navigation */}
          <TouchableOpacity onPress={() => console.log(email)}>
            <ProfileCard photo={photo} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.2,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextBox link={this.state.link} />
          <TouchableOpacity
            onPress={async() => {
              let granted= await this.permissionController.requestPermission(PermissionsAndroid);
              if(granted){
                console.log('hello')
              }
              
            }}
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              top: 10,
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
      </View>
    );
  }
}

export default Dashboard;
