const mongoose = require("mongoose");

let user = mongoose.model("user",new mongoose.Schema({
    user : {type:String,required:true},
    pwd : {type:String,required:true},
    // 注册时间
    regDate : {type:Number,default:Date.now},
    // 头像
    photo : {type:String,default:"http://localhost:3000/img/defaultPhoto.jpg"},
    // 是否权限禁用
    disabled : {type:Boolean,default:false},// 设置权限，比如侮辱类留言会被禁止
    // 是否是管理员
    admin : {type:Boolean,default:false},// 管理员权限
}));

module.exports = user;