import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    themeColor:{
        backgroundColor:"#161616FF"
    },
    flexWidth:(flex)=>{
        return{
            flex
        };
    },
    whiteColor:{
        color: "#FFFFFF",
    }
});

export default styles;