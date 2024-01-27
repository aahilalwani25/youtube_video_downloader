import { Sequelize } from "sequelize";
export const sequelize= new Sequelize({
    username:'aahil',
    database:'youtube_video_downloader',
    password:'aahil',
    host:"192.168.0.125",
    dialect:"mysql"
});

console.log(sequelize)

//module.exports=sequelize;