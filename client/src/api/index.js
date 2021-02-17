// 第一步：导入axios
import axios from "axios";

// 第二步：配置默认的参数
axios.defaults.baseURL = 'http://localhost:3000'; // 默认访问地址
axios.defaults.withCredentials = true; // 跨域允许携带cookie 
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; // 设置POST请求格式

// 导出对象也可以，导出用到的东西
export default{
    // 获取文章信息
    getArticleInfo(){
        return axios.post("/article/getInfo"); // 当上面的baseURL设置好后，在这里直接写后端的路由即可
    },
    // 获取热门文章 不传的时候默认8篇文章，传了之后传即篇是几篇
    /* 
        @parmas
            limit:Number, 一共请求几条数据，默认8条
        @return
            返回axios请求的Promise
    */
    getArticleHot(limit = 8){
        return axios.post("/article/getHot",{limit});
    },
    // 获取文章列表
    getArticleShow:(function(){
        let skip = 0;
        let limit = 5;
        // 传入 true 重新更新 skip和limit，传入false不重新更新
        return function(index=0,ifFresh=false){ // 路由的ID--index
            if(ifFresh){
                skip = 0;
                limit = 5;
            }

            let tag = ["","HTML5&CSS3","JavaScript","NodeJs","Vue&React","Other"][index];
            
            let data = {skip,limit,tag};
            skip += limit;
            return axios.post('/article/getShow',data);
        }
    })(),
    // 获取验证码图片
    getRegisterVCode(){
        return axios.post("/register/vcode");
    },
    // 验证码的提交验证
    getRegisterCheckVcode(svgCode){
        return axios.post('/register/checkVcode',{svgCode})
    },
    // 注册提交接口
    // @parmas
    //      options : Object, 必须，需要 user pwd svgCode 三条属性
    postRegister(options){
        return axios.post("/register",options);
    },
    // 登录接口
    // POST请求在发送POST请求之前，会先发一个OPTIONS的请求，当OPTIONS请求成功之后，它才会把POST请求发送过来。所以这个OPTIONS是为了帮助POST的
    postLogin(options){
        return axios.post('/Login',options);
    },
    postIfLogin(){
        return axios.post("/login/ifLogin");
    },
    // 留言的接口 options => {user:"", content:""}
    commitMessage(options){
        return axios.post("/message/commit",options)
    },
    // 获取留言列表 未写关于列表的滚轮获取及css样式等代码，参考Container滚轮事件函数代码，暂且略过
    getMessageList(skip=0,limit=999){
        return axios.post('/message/getList',{skip,limit});
    }
};