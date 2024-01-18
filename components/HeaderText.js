import React, { Component } from "react";
import { Text, Dimensions } from "react-native";

const {width,height}= Dimensions.get("screen");
export default class HeaderText extends Component{

    constructor(props, children){
        super(props);
    }

    render(){
        return(
            <Text style={{fontSize: height*0.04, ...this.props.styles}}>{this.props.text}</Text>
        );
    }
}