<template>
    <div class="Message">
        <Nav></Nav>
        <div class="main">
            <div class="content">
                <article>
                    <section>
                        <h2>留言板</h2>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                        <p>沟通交流，拉近你我！</p>
                        <RichText @sub="handleSubmit"></RichText>
                    </section>
                    <section>
                        <ul>
                            <li v-for="(item,index) in commentList" :key="item._id">
                                <div class="comment-parent">
                                    <div class="p-img" :style="{backgroundImage:'url('+item.user.photo+')'}"></div>
                                    <div class="p-info">
                                        <div class="p-name">{{item.user.user}}</div>
                                        <div class="p-content" v-html="item.content"></div>
                                        <div class="p-time">                        
                                            <span>{{item.date | getTime}}</span>
                                            <a @click="replyClick(index)">
                                                {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===undefined)?"收起":"回复"}}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="comment-child" v-for="(childItem,childIndex) in item.children" :key="childItem.date + Math.random()">
                                    <div class="c-img" :style="{backgroundImage:'url('+childItem.user.photo+')'}"></div>
                                    <div class="c-info">
                                        <div class="c-name">
                                            <span class="name">{{childItem.user.user}}</span>回复<span class="name">{{childItem.$user}}</span>
                                            <span>{{childItem.content}}</span>
                                        </div>
                                        <div class="c-time">
                                            <span>{{childItem.date | getTime}}</span>
                                            <a @click="replyClick(index,childIndex)">
                                                {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===childIndex)?"收起":"回复"}}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div :class="['comment-reply',{'show':item.reply.ifShow}]">
                                    <textarea v-model="item.reply.content" :placeholder="'回复【'+item.reply.$user+'】:'"></textarea>
                                    <button type="button" class="layui-btn layui-btn-xs">提交</button>
                                </div>
                            </li>
                        </ul>
                    </section>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/Nav';
    import RichText from '../../components/RichText';
    import request from '../../api';

    const postIfLogin = request.postIfLogin;
    const commitMessage = request.commitMessage;
    const getMessageList = request.getMessageList;

    function toTwo(num){
        return (num<10?"0":"") + num;
    }

    export default {
        name: 'Message',
        data() {
            return {
                commentList : [
                    {
                        reply : {
                            user : "", // id
                            content : "", // 回复内容
                            $user : "", // 字符串
                            date : "", // 日期
                            ifShow : false,
                            lastIndexArr : [],
                        },
                        _id :'11',
                        user : {
                            _id : 'xxx',
                            user : '李白',
                            photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                        },
                        content :'<p>11</p><p>22</p>',
                        date : new Date()+'',
                        children : [ // 子评论
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '杜甫',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content :'这里是山路十八弯，这里的逗比抱成团',
                                $user : '李白',
                                date : new Date()+''
                            },
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '国阳',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content : '一座座山川相连~',
                                $user : '杜甫',
                                date : new Date()+''
                            }
                        ]
                    },
                    {
                        reply : {
                            user : "", // id
                            content : "", // 回复内容
                            $user : "", // 字符串
                            date : "", // 日期
                            ifShow : false,
                            lastIndexArr : [],
                        },
                        _id :'33',
                        user : {
                            _id : 'xxx',
                            user : '李白',
                            photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                        },
                        content :'<p>11</p><p>22</p>',
                        date : new Date()+'',
                        children : [ // 子评论
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '杜甫',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content :'这里是山路十八弯，这里的逗比抱成团',
                                $user : '李白',
                                date : new Date()+''
                            },
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '国阳',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content : '一座座山川相连~',
                                $user : '杜甫',
                                date : new Date()+''
                            }
                        ]
                    },
                    {
                        reply : {
                            user : "", // id
                            content : "", // 回复内容
                            $user : "", // 字符串
                            date : "", // 日期
                            ifShow : false,
                            lastIndexArr : [],
                        },
                        _id :'55',
                        user : {
                            _id : 'xxx',
                            user : '李白',
                            photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                        },
                        content :'<p>11</p><p>22</p>',
                        date : new Date()+'',
                        children : [ // 子评论
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '杜甫',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content :'这里是山路十八弯，这里的逗比抱成团',
                                $user : '李白',
                                date : new Date()+''
                            },
                            {
                                user : {
                                    _id : 'xxx',
                                    user : '国阳',
                                    photo : 'http://localhost:3000/img/defaultPhoto.jpg'
                                },
                                content : '一座座山川相连~',
                                $user : '杜甫',
                                date : new Date()+''
                            }
                        ]
                    },
                ]
            }
        },
        filters:{
            getTime(val){
                let date = new Date(val);

                let YY = toTwo(date.getFullYear()),
                    MM = toTwo(date.getMonth()+1),
                    DD = toTwo(date.getDate()),
                    h = toTwo(date.getHours()),
                    m = toTwo(date.getMinutes()),
                    s = toTwo(date.getSeconds());
                return `${YY}年${MM}月${DD}日 ${h}:${m}:${s}`;
            }
        },
        methods: {
            handleSubmit(val){

                postIfLogin()
                    .then(res=>{
                        if (res.data.userInfo){
                            // 登陆了，就发送数据到数据库 -- 执行留言提交的ajax
                            commitMessage({
                                user : res.data.userInfo._id,
                                content : val
                            }).then(res=>{
                                layer.msg('评论成功',{icon: 1});
                                setTimeout(()=>{
                                    window.location.reload();
                                },1000);
                            }).catch(()=>{
                                layer.msg('服务器错误~请稍后再试',{icon: 2});
                            })
                        }else{
                            // 未登录
                            layer.msg('请先登录',{icon: 2});
                        }
                    })
                    .catch(()=>{
                        // 服务器出错
                        layer.msg('服务器错误~请稍后再试',{icon: 2});
                    })

                //console.log("父组件的事件触发");
                console.log(val);
            },
            replyClick(pIndex,cIndex){
                /* console.log(pIndex,cIndex); */
                
                if (pIndex === undefined) return;

                let parentData = this.commentList[pIndex];

                // 改变placeholder的内容 --- 即被回复人的名字
                if (cIndex !== undefined){
                    // 回复的是子评论
                    this.commentList[pIndex].reply.$user = this.commentList[pIndex].children[cIndex].user.user;
                }else{
                    // 回复的是父评论
                    this.commentList[pIndex].reply.$user = this.commentList[pIndex].user.user;
                }
                

                // 两次点的同一个
                // 不是同一个
                if ((pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1])){
                    parentData.reply.ifShow = false;
                    parentData.reply.lastIndexArr = [];
                }else{
                    parentData.reply.ifShow = true;
                    parentData.reply.lastIndexArr = [pIndex,cIndex];
                };

                
                
                if (cIndex !== undefined) {
                    // 不是点的子回复

                }else{
                    // 点的子回复

                }
                
            }
        },
        components:{
            Nav,RichText
        },
        created(){
            getMessageList().then(res=>{
                let data = res.data.data;

                this.commentList = data.map(item=>{
                    item.reply={
                        user : "", // id
                        content : "", // 回复内容
                        $user : "", // 字符串
                        date : "", // 日期 
                        ifShow : false,
                        lastIndexArr : []
                    }
                    return item;
                });
            })
        }
    }
</script>

<style scoped lang="less">
    .Message{
        >.main{
            box-sizing: border-box;
            max-width: 1360px;
            padding: 70px 50px;
            margin: 0 auto;
            >.content{
                width: 100%;
                background-color: #fff;
                >article{
                    section:nth-child(1){
                        box-sizing: border-box;
                        width: 100%;
                        padding: 20px 15px;
                        >h2{
                            font-weight: 700;
                            font-size: 2rem;
                            text-align: center;
                        }
                        >p{
                            font-size: 1.25rem;
                            margin: 1rem 0;
                            text-align: center;
                        }
                    }
                    section:nth-child(2){
                        box-sizing: border-box;
                        padding: 20px 15px;
                        width: 100%;
                        >ul{
                            width: 100%;
                            >li{
                                padding: 20px 0;
                                border-bottom: 1px dotted grey;
                                .comment-parent{
                                    display: flex;
                                    .p-img{
                                        width: 45px;
                                        height: 45px;
                                        background-position: center center;
                                        background-size: cover;
                                    }
                                    .p-info{
                                        flex: 1;
                                        padding-bottom: 20px;
                                        border-bottom: 1px dotted #aaa;
                                        .p-name{
                                            overflow: hidden;
                                            color: #01aaed;
                                        }
                                        .p-content{
                                            padding:2px 0 5px 0;
                                            min-height: 30px;
                                            font-size: 12px;
                                            word-break: break-all;
                                        }
                                        .p-time{
                                            font-size: 12px;
                                            color: #999;
                                            span{
                                                padding-left: 15px;
                                                padding-right: 15px;
                                            }
                                            a{
                                                color: blue;
                                                cursor: pointer;
                                            }
                                        }
                                    }
                                }
                                .comment-child{
                                    display: flex;
                                    box-sizing: border-box;
                                    width: 100%;
                                    padding-left: 50px;
                                    padding-top: 20px;
                                    .c-img{
                                        width: 45px;
                                        height: 45px;
                                        background-position: center center;
                                        background-size: cover;
                                    }
                                    .c-info{
                                        flex: 1;
                                        font-size: 12px;
                                        .c-name{
                                            .name{
                                                color: #01aaed;
                                                margin: 0 5px;
                                            }
                                        }
                                        .c-time{
                                            padding-left: 20px;
                                            padding-top: 5px;
                                            span{
                                                margin-right: 10px;
                                            }
                                            a{
                                                cursor: pointer;
                                                color: blue;
                                            }
                                        }
                                    }
                                }
                                .comment-reply{
                                    overflow: hidden;
                                    box-sizing: border-box;
                                    width: 100%;
                                    height: 0;
                                    padding-left: 50px;
                                    padding-top: 10px;
                                    transition: height .3s;
                                    &.show{
                                        height: 100px;
                                    }
                                    textarea{
                                        display: block;
                                        width: 100%;
                                        height: 60px;
                                        border-color: #aaa;
                                        padding: 10px;
                                        box-sizing: border-box;
                                        resize: none;
                                    }
                                    button{
                                        margin-top: 8px;
                                        display: block;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
</style>
