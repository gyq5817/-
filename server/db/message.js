const mongoose = require("mongoose");

// 提前把 Schema 单独拿出来，后续关联表会用到
let Schema = mongoose.Schema;

let message = mongoose.model("message",new Schema({
    
    // 关联用户表
    user : {type:Schema.Types.ObjectId , ref:"user" , required:true},

    // 留言内容
    content : {type:String , required: true},

    // 日期
    date : {type:Date , default:Date.now},

    // 子留言
    children : [
        {
            // 子留言 用户
            user : {type:Schema.Types.ObjectId , ref:"user" , required:true},
            // 子留言 内容
            content : {type:String , required: true}, 
            // 子留言 评论对象
            $user : {type:String , required: true},
            // 子留言 日期
            date : {type:Date , default:Date.now}
        }
    ]

}));
/* 
// 测试
message.create({
    user : "5e9c0ab63f929e2e8870c0e6",
    content : "<p>我来评论啦</p>"
});
 */
module.exports = message;