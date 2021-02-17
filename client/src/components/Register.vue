<template>
    <div>
        <!-- ref是DOM保留，可以在JS代码中去获取这个DOM -->
        <!-- ref是绑定，当写在一个组件里是：绑定了这个组件 -->
        <!-- 如果在普通的DOM元素上使用，引用信息就是元素或者说DOM节点; 如果用在子组件上，引用信息就是组件实例 -->
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="user">
                <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <!--  show-password 可明文显示密码或者是黑点状，不喜欢带有小眼睛的样子，可以把其改为type="password" -->
                <el-input v-model="form.pwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model="form.checkPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="svgCode" class="vcode">
                <el-input v-model="form.svgCode"></el-input>
                <div class="svg" v-html="register.svgText"></div>
                <el-link type="primary" @click="getVCode" :disabled="register.disabled">{{register.refreshText}}</el-link>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="success" @click="submitForm('form')" :disabled="register.submitDisabled">立即注册</el-button>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>
    import request from '../api/index';
    
    const getRegisterVCode = request.getRegisterVCode;
    const getRegisterCheckVcode = request.getRegisterCheckVcode;
    const postRegister = request.postRegister;

    export default {
        name: "Register",
        data() {
            return {
                // 表单数据
                form : {
                    user : "",
                    pwd : "",
                    checkPwd : "",
                    svgCode : "",
                },
                // 表单验证
                rules : {
                    // 用户名验证
                    user : [
                        // 第一条代表是否必须 trigger: 'blur'--trigger是触发条件，blur是离开焦点
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        // 第二条是额外规则 change--只要数据发生改变，就会监听到:model，去随之改变
                        { 
                            // 数据类型
                            type : "string", 
                            // 正则规则
                            pattern : /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '2-7位，数字 字母 _ - 中日韩文', 
                            trigger: ['blur','change'] 
                        }
                    ],
                    // 密码验证
                    pwd : [
                        // 第一条代表是否必须 trigger: 'blur'--trigger是触发条件，blur是离开焦点
                        //{ required: true, message: '请输入密码', trigger: 'blur' },
                        // 第二条是额外规则 change--只要数据发生改变，就会监听到:model，去随之改变
                        { 
                            type : "string", 
                            validator : (rule,value,cb)=>{
                                //console.log(rule); // rule 是验证规则
                                //console.log(value); // value 是输入的内容
                                //console.log(value === this.form.pwd); // 相等时为true，不等时为false
                                if (value){
                                    // 验证密码是否符合规则
                                    if(/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                                        cb(); // 符合规则，不传任何参数，直接执行
                                    }else{
                                        cb(new Error("6-18位，不允许出现奇怪的字符"));
                                    }
                                }else{
                                    cb(new Error("请输入密码"));
                                }
                                // 在这里还需要触发确认密码的验证
                                //console.log(this.$refs); // 打印出来的是form: VueComponent，也就是上方绑定的组件,因为ref绑定的是一个子组件，所以引用信息就是这个组件实例
                                // .validateField() 是Element 提供的一个验证方式，传入一个参数即可。这里传入的是确认密码验证的方法--即触发再次验证密码
                                this.form.checkPwd && this.$refs.form.validateField("checkPwd"); // 找到之前绑定过的form。  $refs 是所有注册过的ref的一个集合，它包含所有注册过的 DOM 元素和组件实例
                            },
                            required: true,
                            message: '6-18位，不允许出现奇怪的字符', 
                            trigger: ['blur','change'] 
                        }
                    ],
                    // 确认密码验证
                    checkPwd : {
                        validator : (rule,value,cb)=>{
                            //console.log(rule); // rule 是验证规则
                            //console.log(value); // value 是输入的内容
                            //console.log(value === this.form.pwd); // 相等时为true，不等时为false
                            if (value){
                                if (value === this.form.pwd){
                                    cb();
                                }else{
                                    cb(new Error("两次密码不一致"));
                                }
                            }else{
                                cb(new Error("请再次输入密码"));
                            }
                                
                        },
                        required: true,
                        trigger: ['blur','change'] 
                    },
                    // 验证码
                    svgCode : {
                        //console.log(rule); // rule 是验证规则
                        //console.log(value); // value 是输入的内容
                        //console.log(value === this.form.pwd); // 相等时为true，不等时为false
                        validator : (rule,value,cb)=>{
                            if(!value){
                                cb(new Error("请输入验证码！"));
                            }else(
                                getRegisterCheckVcode(value).then(res=>{
                                    if(res.data.code === 0){
                                        cb();
                                    }else{
                                        cb(new Error("验证码错误"));
                                    }
                                }).catch(e=>{
                                    cb(new Error("未知错误..."));
                                })
                            )
                        },
                        required: true,
                        trigger: 'blur' 
                    }
                },
                // 注册相关的数据
                register : {
                    svgText : "loading...",
                    refreshText : "刷新",
                    disabled : true,
                    timer : null,
                    submitDisabled : false,
                }
            }
        },
        methods: {
            getVCode(){
                getRegisterVCode().then(res=>{
                    clearTimeout(this.register.timer);
                    let t = 0;
                    let fn = ()=>{
                        t+=1000;
                        if(t > res.data.time){
                            clearTimeout(this.register.timer);
                            this.register.disabled = false;
                            this.register.refreshText = "刷新";
                        }else{
                            this.register.disabled = true;
                            this.register.refreshText = (((res.data.time - t)/1000)|0) + "s后可以刷新";
                        }
                    };
                    this.register.timer = setInterval(fn,1000);
                    fn();
                    // 更新验证码图片
                    this.register.svgText = res.data.data;
                });
            },
        },
        mounted() {
            this.getVCode();
        },
        destroyed(){
            clearTimeout(this.register.timer);
        }
    }
</script>

<style scoped lang="less">
    .el-form{
        user-select: none;
        padding-right: 30px;
        .vcode{
            .el-input{
                float: left;
                width: 35%;
            }
            div.svg{
                float: left;
                width: 35%;
                height: 40px;
                /deep/ svg{
                    width: 100% !important;
                    height: 100% !important;
                }
            }
            .el-link{
                font-size: 12px;
                line-height: 40px;
                color: blue;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>
