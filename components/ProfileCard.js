import React from "react";
import { Image } from "react-native";

export default class ProfileCard extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Image
            
              source={{uri: this.props.photo}}
              style={{
                width: 40,
                height: 40,
                objectFit: 'contain',
                borderRadius: 50,
                //alignSelf: 'flex-end',
                right: 10,
              }}
            />
        );
    }
}