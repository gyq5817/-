var express = require('express');
var router = express.Router();



// 文章相关的接口
router.use("/article",require("./article/index"));

// 注册相关的接口
router.use("/register",require("./register/index"));

// 登录接口
router.use("/login",require("./login/index"));

// 留言接口
router.use("/message",require('./message/index'))

module.exports = router;
