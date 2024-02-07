import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

class TextBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput
      
        {...this.props}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        placeholderTextColor={'grey'}
        style={{
          color: 'black',
          backgroundColor: 'white',
          width: 300,
          top: 10,
          borderRadius: 20,
          height: 60,
        }}
      />
    );
  }
}

export default TextBox;
