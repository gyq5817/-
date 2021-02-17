const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let article = mongoose.model("article",new Schema({
    type : {type: String,required: true},
    title : {type: String,required: true},
    content : {type: String,required: true},
    tag : {type: String,required: true},
    date : {type: Date,default:Date.now},
    surface : {type: String,default: 'http://localhost:3000/img/defaultSurface.jpg'},
    pv : {type: Number,default: 0},
    comment : [{type: Schema.Types.ObjectId,ref:"comment"}] // 关联至comment
})); 

// 假数据
/* for (let i=0;i<100;i++){
    article.create({
        type : ["原创","转载"][(Math.random()*2)|0], // 随机数取整 |0 就可以  |0 是或0的意思
        title : `第${i+1}篇文章`,
        content : (""+i+i+i+i+i+"哈哈哈哈哈我是文章的内容").repeat(10),
        pv : Math.random()*99999|0,
        tag : ["HTML5&CSS3","JavaScript","NodeJs","Vue&React","Other"][(Math.random()*5)|0]
    });
}; */

module.exports = article;