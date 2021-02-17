<template>
    <div class="articleShow">
        <section v-for="item in articleList">
            <h5>
                <span>【{{item.type}}】</span>
                <a href="">{{item.title}}</a>
            </h5>
            <div class="time">
                <p class="date">{{item.date | date}}</p>
                <p class="month">{{item.date | month}}<span>月</span></p>
                <p class="year">{{item.date | year}}</p>
            </div>
            <div class="content">
                <a href="" :style="{backgroundImage:'url('+item.surface+')'}">
                    <i></i>
                </a>
                {{item.content}}
            </div>
            <div class="read-more">
                <a href="">继续阅读</a>
            </div>
            <div class="footer">
                <div class="fl">
                    <i class="el-icon-s-promotion"></i>
                    <span>{{item.tag}}</span>
                </div>
                <div class="fr">
                    <span class="pv">
                        <i class="el-icon-view"></i>
                        <i>{{item.pv}}</i>
                    </span>
                    <span class="comment">
                        <i class="el-icon-chat-dot-round"></i>
                        <i>{{item.comment.length}}</i>
                    </span>
                </div>
            </div>
        </section>
        <p class="nomore">没有更多数据了，真没了╭(╯^╰)╮……</p>
    </div>
</template>

<script>

    import request from '../api/index';

    const getArticleShow = request.getArticleShow;

    export default {
        name: "ArticleShow",
        data(){
            return{
                articleList : []
            }
        },
        filters : {
            date(value){
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
            },
            month(value){
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
            },
            year(value){
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
            }
        },
        computed: {
            id(){
                return this.$route.params.id;
            }
        },
        watch: {
            id(){
                // 当ID发生变化时
                getArticleShow(this.id,true).then(res=>{
                    //console.log(res);
                    this.articleList = res.data.data;
                });
            }
        },
        methods: {
            handleScroll(){
                //console.log(1) // 检测博客页面滚林滚动是否能被监听到
                // 判断滚轮是否滚动到页面底部--滚动高度+窗口高度=页面（文档/可视区）全部高度
                // 获取文档高度
                let c = document.documentElement.offsetHeight;
                //console.log(c);

                // 获取滚动高度
                let a = document.documentElement.scrollTop;
                //console.log(a);

                // 获取可视区高度
                let b = document.documentElement.clientHeight;
                //console.log(b);
                //console.log(a+b,c); // 检测得到 a+b=c=2050

                if (a + b >= c - 200){
                    // 当滚动高度达到设定值时，执行 getArticleShow
                    /* getArticleShow(this.id,false).then(res=>{
                        let data = res.data.data;
                        if(data.length){
                            this.articleList.push(...res.data.data);
                        }else{

                        }
                    }); */
                }
            }
        },
        mounted(){
            // 发送第一次请求
            getArticleShow(this.id,true).then(res=>{
                //console.log(res);
                this.articleList = res.data.data;
            });
            // 监听滚轮（博客页面的滚动加载）事件
            window.addEventListener("scroll",this.handleScroll);
        }
    }
</script>

<style scoped lang="less">
    .articleShow{
        >section{
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            width: 100%;
            padding: 20px 30px 25px;
            margin-bottom: 20px;
            background-color: #fff;
            &:nth-child(1)::before{
                content: "置顶";
                position: absolute;
                height: 20px;
                line-height: 20px;
                text-align: center;
                width: 74px;
                background-color: #ff5722;
                color: #fff;
                transform: rotate(-45deg);
                left: -18px;
                top: 9px;
            }
            >h5{
                line-height: 30px;
                padding: 5px 130px 5px 0;
                border-bottom: 1px solid #e8e9e7;
                font-size: 18px;
                font-weight: 400;
                span{
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    vertical-align: bottom;
                    color: #2ea7e0;
                }
                a{
                    color: #000;
                    text-decoration: none;
                    &:hover{
                        color: #6bc30d;
                        text-decoration: underline;
                    }
                }
            }
            .time{
                width: 90px;
                height: 70px;
                font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
                position: absolute;
                right: 10px;
                top: 10px;
                background-color: #fff;
                padding: 0 20px 5px 20px;
                line-height: 32px;
                .date{
                    display: block;
                    text-align: center;
                    font-weight: 700;
                    font-size: 40px;
                    color: #6bc30d;
                    position: relative;
                    top: 2px;
                }
                .month{
                    display: inline-block;
                    color: #989997;
                    font-size: 18px;
                    span{
                        font-size: 14px;
                    }
                }
                .year{
                    display: inline-block;
                    color: #989997;
                    margin-left: 10px;
                    font-size: 18px;
                }
            }
            .content{
                position: relative;
                margin-top: 20px;
                line-height: 28px;
                min-height: 200px;
                a{
                    position: relative;
                    display: block;
                    overflow: hidden;
                    float: left;
                    width: 300px;
                    height: 180px;
                    border: 1px solid #e8e9e7;
                    margin-right: 20px;
                    background-position: center top;
                    background-size: cover;
                    i{
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: block;
                        width: 0;
                        height: 100%;
                        /* background-color: #fff; */
                        transform: translateX(-40px) skew(-15deg);
                        box-shadow: 0 0 30px 20px rgba(255, 255, 255, .3);
                    }
                    &:hover i{
                        transition: transform .5s .5s; // 图片白光动画时间.3s 延迟.5s
                        transform: translateX(350px) skew(-15deg);
                    }
                }
            }
            .read-more{
                position: relative;
                &::before{
                    content: "";
                    display: inline-block;
                    height: 1px;
                    top: 20px;
                    left: 100px;
                    right: 0;
                    position: absolute;
                    background-color: #d0d0d0;
                }
                a{
                    font-weight: bold;
                    color: #383937;
                    text-decoration: none;
                    border: none;
                    line-height: 40px;
                    &:hover{
                        color: #6bc30d;
                        text-decoration: underline;
                    }
                }
            }
            .footer{
                .fl{
                    float: left;
                    i{
                        font-size: 18px;
                        margin-right: 5px;
                        color: #666;
                    }
                    span{
                        display: inline-block;
                        font-size: 12px;
                        padding: 2px 5px;
                        background-color: #f1f2f0;
                        color: #787977;
                        margin: 2px;
                        text-decoration: none;
                        -webkit-transition: all .2s;
                        transition: all .2s;
                        &:hover{
                            color: #fff;
                            background: #6bc30d;
                        }
                    }
                }
                .fr{
                    float: right;
                    color: #666;
                    i{
                        font-style: normal;
                        margin-right: 12px;
                    }
                    .comment{
                        margin-left: 20px;
                    }
                }
            }
        }
    }

</style>
