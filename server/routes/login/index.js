const express = require("express");
const svgCaptcha = require("svg-captcha");
const userDB = require("../../db/user");

let router = express.Router();

// 登录接口
router.post("/",(req,res)=>{
    // 已经登录就不要往下走了   验证用户是否已经登录(此处可以省略，因为在登陆之后在登录按钮处会显示用户头像)
    if(req.session.login){
        res.send({
            code : 2,
            msg : "已经登录，请退出之后再登录"
        });
        return;
    }

    let {user,pwd} = req.body;
    // 验证数据的有效性
    if(!user || !pwd){
        res.send({
            code : 1,
            msg : "数据无效，请检查后再注册。"
        });
        return;
    };
    // 验证用户与密码
    if(
        !/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) ||
        !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)
    ){
        res.send({
            code : 2,
            msg : "用户名或密码不符合规则"
        });
        return;
    };
    userDB.findOne({user})
        .then(data=>{
            if(data){
                // 有该用户
                if(data.pwd === pwd){
                    // 登陆之后写入session
                    req.session.login = data;
                    // 返回前段

                    res.send({
                        code : 0,
                        msg : "登陆成功！"
                    })
                }else{
                    res.send({
                        code : 2,
                        msg : "密码错误！"
                    })
                }
            }else{
                // 没有该用户
                res.send({
                    code : 1,
                    msg : "用户不存在！"
                });
            }
        })
        .catch(e=>{
            res.send({
                code : 4,
                msg : "服务器错误~请稍后再试！！！"
            })
        });
});

// 验证是否已经登录
router.post("/ifLogin",(req,res)=>{
    let data = req.session.login;

    let resData = false;
    if (data) {
        delete data.pwd;
        delete data.__v;
        resData = data;
    };
    res.send({
        userInfo : resData
    });
});

module.exports = router;