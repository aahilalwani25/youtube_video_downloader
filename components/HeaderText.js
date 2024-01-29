import React, {Component} from 'react';
import {Text, Dimensions} from 'react-native';
import styles from '../global/styles/styles';

const {width, height} = Dimensions.get('screen');
export default class HeaderText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[{fontSize: height * 0.04}, styles.whiteColor]}>
        {this.props.text}
      </Text>
    );
  }
}
