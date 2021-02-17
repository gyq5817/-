// 用于在后端存储文章的信息表

const mongoose = require("mongoose");

let articleInfo = mongoose.model("articleInfo",new mongoose.Schema({
    tags : [String],
    num : Number,
}));

/* articleInfo.create({
    tags : ["HTML5&CSS3","JavaScript","NodeJs","Vue&React","Other"],
    num : 100
}); */

module.exports = articleInfo;