<template>
    <div id="nav">
        <div class="nav-main">
            <div class="n-m-logo">Mr.Gyq</div>
            <div class="n-m-login">
                <el-popover
                    v-if="ifLogin"
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    :content="'欢迎登录：'+login.user">
                    <a href="" slot="reference" class="img" 
                        :style="{
                            backgroundImage:'url('+login.photo+')',
                            position: 'absolute',
                            top: '10px',
                            left: '41px',
                            width: '40px',
                            height: '40px',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }"
                    ></a>
                </el-popover>
                <div class="login" v-else>
                    <el-button @click="handleLogin" type="primary">登录</el-button>
                    <el-button @click="handleRegister" type="success">注册</el-button>
                </div>
            </div>
            <div class="n-m-nav">
                <!-- 当 list 为1时，首页变颜色，以此类推为6时，关于变颜色 -->
                <ul :class="'list'+whichActive">
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/blog/0">博客</router-link></li>
                    <li><router-link to="/message">留言</router-link></li>
                    <li><router-link to="/diary">日记</router-link></li>
                    <li><router-link to="/links">友链</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    import Register from './Register';
    import Login from './Login';
    import request from '../api';

    // 引入路由
    const postRegister = request.postRegister;
    const postLogin = request.postLogin;
    const postIfLogin = request.postIfLogin;

    export default {
        name: "Nav",
        data() {
            return {
                // 路由列表
                routerList : ["Home","Blog","Message","Diary","Links","About"],

                // 设置弹窗 key 值
                alertKey : 0, // 设置初始 key 值为0

                // 是否已经登录
                ifLogin : false,
                // 用户信息
                login : {
                    user : "",
                    photo : ""
                }
            }
        },
        computed: {
            whichActive(){
                // 获取当前路由，并将其定义为 index
                let index = this.routerList.indexOf(this.$route.name);
                return index + 1;
            }
        },
        components:{
            Register // 注册Register
        },
        methods: {
            handleRegister(){
                const h = this.$createElement;
                this.$msgbox({
                    title: '注册',
                    message: h(Register,{key:this.alertKey++}), // 使用Register,绑定key值
                    showCancelButton : true, // 显示取消按钮
                    showConfirmButton : true, // 显示确定按钮
                    closeOnClickModal : false,
                    confirmButtonText : "立即注册",
                    cancelButtonText : "取消",
                    beforeClose: (action, instance, done) => {
                        console.log(action);
                        if(action === "confirm"){
                            let vm = this;
                            (function(){
                                this.register.submitDisabled = true;
                                this.$refs["form"].validate((valid) => {
                                    if (valid) {
                                        // 验证通过
                                        postRegister(this.form).then(res=>{
                                            this.getVCode();
                                            if(res.data.code){
                                                this.$message({
                                                    message : res.data.msg,
                                                    type : "error",
                                                    duration : 2000
                                                });
                                            }else{
                                                // 注册成功
                                                this.$message({
                                                    message : "注册成功！",
                                                    type : "successs",
                                                    duration : 2000
                                                });
                                                done(); // 注册成功，关闭弹窗
                                                setTimeout(()=>{
                                                    vm.handleLogin();
                                                },2000);
                                            }
                                        }).catch(e=>{
                                            this.getVCode();
                                            this.$message({
                                                message : "注册失败请稍后再试！",
                                                type : "successs",
                                                duration : 2000
                                            });
                                            //console.log(e);
                                        });
                                    } else {
                                        // 验证失败
                                        //console.log('error submit!!');
                                        return false;
                                    }
                                });
                            }).call(instance.$children[2]);
                            //console.log(instance);// 获取弹窗组件                           
                        }else{
                            done(); // 执行done，关闭弹窗
                        }
                    }
                }).then(()=>{}).catch(()=>{}); // 在注册时，会返回一个promise，.then .catch 的空函数，注册时什么都不用做，就没有promise了
            },
            handleLogin(){
                const h = this.$createElement;
                this.$msgbox({
                    title: '登录',
                    message: h(Login,{key:this.alertKey++}), // 使用Register,绑定key值
                    showCancelButton : false, // 显示取消按钮
                    showConfirmButton : true, // 显示确定按钮
                    closeOnClickModal : false,
                    confirmButtonText : "立即登录",
                    cancelButtonText : "取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm"){
                            (function(){
                                this.$refs["form"].validate((valid) => {
                                    if (valid) {
                                        // 验证通过
                                        postLogin(this.form).then(res=>{
                                            console.log(res);
                                            if(res.data.code){
                                                // 登录失败
                                                this.$message({
                                                    message : res.data.msg,
                                                    type : "error",
                                                    duration : 2000
                                                });
                                            }else{
                                                // 登录成功
                                                this.$message({
                                                    message : res.data.msg,
                                                    type : "successs",
                                                    duration : 2000
                                                });
                                                done(); // 登录成功，关闭弹窗
                                                setTimeout(()=>{
                                                    window.location.reload();
                                                },1000);
                                            }
                                        }).catch(e=>{
                                            this.$message({
                                                message : "登录失败请稍后再试！",
                                                type : "successs",
                                                duration : 2000
                                            });
                                        });
                                    } else {
                                        // 验证失败
                                        //console.log('error submit!!');
                                        return false;
                                    }
                                });
                            }).call(instance.$children[2]);
                            //console.log(instance);// 获取弹窗组件                           
                        }else{
                            done(); // 执行done，关闭弹窗
                        }    
                    }
                }).then(()=>{}).catch(()=>{}); // 在注册时，会返回一个promise，.then .catch 的空函数，注册时什么都不用做，就没有promise了
            },
            handleClick(){
                console.log(1);
            }
        },
        // 在实例创建完成之后，立即向后台发送请求验证用户是否已经登录
        created() {
            postIfLogin().then(res=>{
                if (res.data.userInfo) {
                    this.ifLogin = true;
                    this.login.user = res.data.userInfo.user;
                    this.login.photo = res.data.userInfo.photo;
                } else {
                    this.ifLogin = false;
                }
            });
        },
    }
</script>

<style scoped lang="less">
    #nav{
        overflow: hidden;
        position: fixed; // 通过 position: fixed;top: 0;left: 0; 设置导航置顶
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #e8e9e7;
        // 子选择器
        >.nav-main{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            height: 60px;
            margin: 0 auto;
            padding: 0 50px;
            /* background-color: pink; */
            .n-m-logo{
                float: left;
                width: 100px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #777;
                font-size: 40px;
                font-family: BarbaraHand;
            }
            .n-m-login{
                position: relative;
                float: right;
                width: 122px;
                height: 60px;
                line-height: 60px;
                .el-button{
                    padding: 9px 13px;
                }
                >div.userInfo{
                    width: 100%;
                    height: 100%;
                }
            }
            .n-m-nav{
                float: right;
                width: 576px;
                height: 60px;
                margin-right: 8%;
                ul{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    li{
                        flex: 1;
                        a{
                            position: relative;
                            display: block;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            line-height: 60px;
                            color: #212220;
                            font-weight: 400;
                            font-size: 15px;
                            transition: color .5s;
                            &::after{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: 0 auto;
                                content: "";
                                width: 0;
                                height: 2px;
                                background-color: #6bc30d;
                                transition: width .5s;
                            }
                            &:hover{
                                color: #6bc30d;
                                &::after{
                                    width: 100%;
                                }
                            }
                        }
                    }
                    &.list1 li:nth-child(1),
                    &.list2 li:nth-child(2),
                    &.list3 li:nth-child(3),
                    &.list4 li:nth-child(4),
                    &.list5 li:nth-child(5),
                    &.list6 li:nth-child(6){
                        a{
                            color: #6bc30d;
                            &::after{
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
