import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class NavBar extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    
    return (
        <View
        style={{
          //flex: 0.07,
          width: '100%',
          height: 50,

          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        {this.props.children}
      </View>
    );
  }
}

export default NavBar;
