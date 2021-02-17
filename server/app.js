var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// 连接数据库
mongoose.connect("mongodb://localhost:27017/blog",{ useUnifiedTopology: true,useNewUrlParser: true })
    .then(()=>{console.log("数据库连接成功")})
    .catch(()=>{console.log("数据库连接失败")});

// App实例
var app = express();

// 中间件设置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 允许跨域--向前端开放一个允许跨域的API
app.use((req,res,next)=>{
    res.header({
        // 允许携带 Cookie
        'Access-Control-Allow-Credentials': true,
        // 允许所有源跨域
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        // 请求头信息
        'Access-Control-Allow-Headers': 'Content-Type',
        // 允许跨域的请求方法
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        // 允许跨域的内容格式
        'Content-type': 'application/json; charset=utf-8'
    })
    if(req.ethod === "OPTIONS"){
        res.sendStatus(200); // 如果是options的请求，直接返回 200状态码
    }else{
        next(); // 不是的话就执行下一步
    }
});

// 设置session
app.use(require("./middleware/session"));

// 设置路由
app.use('/', require('./routes/index'));

module.exports = app;
