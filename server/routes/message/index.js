const express = require("express");

const messageDB = require("../../db/message")

const router = express.Router();

// 提交留言接口 
router.post("/commit",(req,res)=>{
    let {user,content} = req.body;

    // 验证数据
    if (!user || !content){
        res.send({
            code : 1,
            msg : "数据格式错误"
        });
        return;
    }

    // 添加评论
    messageDB.create({user,content})
        .then(()=>{
            res.send({
                code : 0,
                msg : "评论成功！"
            });
        })
        .catch(()=>{
            res.send({
                code : 4,
                msg : "服务器错误~"
            });
        })
});

// 获取留言
router.post("/getList",(req,res)=>{
    let {skip,limit} = req.body;
    // 拿取数据
    messageDB.find({},{},{skip,limit,sort:{date:-1}})
        .than(data=>{
            res.send({
                code : 0,
                msg : "请求成功",
                data
            });
        })
        .catch(()=>{
            res.send({
                code : 4,
                msg : "服务器错误",
                data : []
            });
        })
});

module.exports = router;