import React, {Component} from 'react';
import {View, Text, Modal, Button} from 'react-native';

class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              padding: 22,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            <Text>Hi, This is dummy alert!</Text>
            <Button
              onPress={() => {
                this.setState({visible: false});
              }}
              title="Close"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default CustomAlert;
