import { DataTypes, Model } from "sequelize";
//const sequelize = require('sequelize')
import { sequelize } from "../config.js";

export default class GoogleUser extends Model{}

GoogleUser.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    email:{
        type:DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    idToken:{
        type:DataTypes.TEXT,
        allowNull: false,
        unique:true,
    },
    photo:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
},{
    modelName:"google_users",
    sequelize
});
//module.exports=GoogleUser;
//export default GoogleUser;
