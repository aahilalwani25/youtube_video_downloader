import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
    };
  }

  render() {
    return (
      <TextInput
      
        onChangeText={text => {
          this.setState({link: text});
        }}
        placeholder='Enter Youtube Link'
        placeholderTextColor={'grey'}
        style={{
          color: 'black',
          backgroundColor: 'white',
          width: 300,
          top: 10,
          borderRadius: 20,
          height:60
          
        }}
      />
    );
  }
}

export default TextBox;
