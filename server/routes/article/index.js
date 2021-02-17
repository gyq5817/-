const express = require("express");
var article = require("../../db/article");
var articleInfo = require("../../db/articleInfo");

let router = express.Router();

// 获取文章 Info
router.post("/getInfo",(req,res)=>{
    articleInfo.findOne({},{_id:0,__v:0})
        .then(data=>{
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
                data : null
            });
        });
});

// 获取文章列表
/* router.post("/getList",(req,res)=>{
    let postData = req.body;
})
 */

 // 获取热门文章 8 篇
router.post("/getHot",(req,res)=>{              // skip:0 是从第几条开始，limit:8是限制都第几条为止
    let {limit} = req.body;
    article.find({},{__v:0},{sort:{pv:-1},skip:0,limit})
        .then(data=>{
            res.send({
                code : 0,
                data
            });
        })
        .catch(()=>{
            res.send({
                code : 4,
                msg : "服务器错误",
                data : null
            })
        })
});

// 文章列表的显示
router.post("/getShow",(req,res)=>{
    let {skip,limit,tag} = req.body;
    console.log(skip,limit,tag);
    let options = tag?{tag}:{};
    article.find(options,{__v:0},{skip,limit,sort:{pv:-1}})
        .then(data=>{
            //res.send("aaaa");
            res.send({
                oode : 0,
                data
            });
        })
        .catch(err=>{
            //res.send("bbbb");
            res.send({
                code : 4,
                msg :　"服务器错误"
            });
        });
    /* article.find({tag},{__v:0},{skip,limit})
        .then(data=>{
            //res.send("aaaa");
            res.send({
                oode : 0,
                data
            });
        })
        .catch(err=>{
            //res.send("bbbb");
            res.send({
                code : 4,
                msg :　"服务器错误"
            });
        }); */
});

// 导出
module.exports = router;