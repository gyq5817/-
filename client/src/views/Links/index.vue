<template>
    <div class="Links">
        <Nav></Nav>
        <div class="canvas" ref="can">
            <div class="txt">
                <h2>友情链接</h2>
                <p>时光让耳朵变得宽容，孤独让情绪变的脆弱</p>
            </div>
            <Yinshi></Yinshi>
        </div>
        <div class="link-main">
            <div class="rule">
                <h3>链接申请说明</h3>
                <p>
                    <i class="fa fa-close"></i>经常宕机&nbsp;
                    <i class="fa fa-close"></i>不合法规&nbsp;
                    <i class="fa fa-close"></i>插边球站&nbsp;
                    <i class="fa fa-close"></i>红标报毒&nbsp;
                    <i class="fa fa-check"></i>原创优先&nbsp;
                    <i class="fa fa-check"></i>技术优先
                </p>
                <p>交换友链可在留言板留言.本站链接如下：<br>
                名称：幻听<br>
                网址：https://www.*******.cn<br>
                图标：https://www.*******.cn/logo.png<br>
                描述：燕十三·一个人的江湖</p>
                <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
            </div>
            <div class="container">
                <ul>
                    <li v-for="item in linksList">
                        <a :href="item.href" target="_blank">
                            <img :src="item.icon">
                            <h3>{{item.name}}</h3>
                            <p>{{item.des}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '../../components/Nav';
    import Yinshi from '../../components/Yinshi'
    export default {
        name: "Links",
        data() {
            return {
                linksList:[
                    {name:"Vector-Blog",href:"http://vectorjzc.top",icon:"http://vectorjzc.top/logo/town.jpg",des:"一个跨专业的前端萌新"},
                    {name:"封尘居",href:"https://www.fengchenju.xyz",icon:"https://www.fengchenju.xyz/avatar.png",des:"热爱并坚持使用.NET的全栈开发者的博客"},
                    {name:"77’s 博客",href:"https://1x77.com",icon:"https://1x77.com/tx.png",des:"专注机械设计分享"},
                    {name:"TanJia",href:"http://www.tanj.com.cn",icon:"http://www.tanj.com.cn/public/img/lg.png",des:"一个前端程序员的个人博客 | 心之所向，无问西东"},
                    {name:"时间里的",href:"https://guanchao.site",icon:"https://guanchao.site/uploads/website/5c093bf268185.png",des:"技术博客"},
                    {name:"杨学峰博客",href:"https://yangsihan.com",icon:"https://www.yangsihan.com/static/css/logo.png",des:"一个Python程序员的博客。记录和分享学习的心得,感悟生活,留住感动,静静寻觅生活的美好"},
                    {name:"筱陌之家",href:"https://moshanghua.net",icon:"https://moshanghua.net/favicon.ico",des:"陌上花的小窝！前端博客，个人前端笔记与案例展示、学习经验交流！这里有我的故事，欢迎你来倾听~陌上花开，可缓缓归矣！"},
                    {name:"Zhua 个人博客",href:"http://www.zhua91.com",icon:"http://www.zhua91.com/favicon.ico",des:"斯人若彩虹，遇上方知有"},
                    {name:"AI码真香",href:"https://www.xmlvhy.com",icon:"https://static.xmlvhy.com/upload/logo.jpg",des:"AI码真香|Java技术交流，技术分享，资源分享"},
                    {name:"TAN博客",href:"http://www.tanqingfu.xyz",icon:"http://www.tanqingfu.xyz/images/logo_.png",des:"TAN博客-努力不会徒劳"},
                    {name:"马王天地",href:"http://www.goodym.cn/",icon:"http://www.goodym.cn/res/images/yumi-logo.png",des:"马王天地-java项目源码分享网-一个专业的Java知识分享平台"},
                    {name:"Q-Blog",href:"http://www.qbl.link",icon:"http://www.qbl.link/Content/Web/favicon.ico",des:"一个.NET程序员的个人博客"},
                    
                ],
            }
        },
        components:{
            Nav,Yinshi
        },
    }
</script>

<style scoped lang="less">
    .Links{
        width: 100%;
        padding-top: 60px;
        .canvas{
            position: relative;
            width: 100%;
            height: 260px;
            .txt{
                position: absolute;
                left: 50%;
                top: 45%;
                text-align: center;
                transform: translate(-50%,-50%);
                color: #fff;
                h2{
                    font-size: 30px;
                    font-weight: normal;
                }
                p{
                    font-size: 20px;
                }
            }
        }
        .link-main{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            padding: 30px 78px;
            margin: 0 auto;
            .rule{
                box-sizing: border-box;
                padding: 20px;
                width: 100%;
                background-color: #fff;
                color: #515250;
                h3{
                    margin-bottom: 1rem;
                    padding-left: 1rem;
                    border-left: .25rem solid #6bc30d;
                    font-weight: 700;
                    font-size: 1.5rem;
                    line-height: 1.5rem;
                }
                p{
                    margin: 1.5rem 0;
                    padding-left: 18px;
                    font-family: Raleway,Segoe UI,Lucida Grande,Helvetica,Arial,Microsoft YaHei;
                    line-height: 1.75rem;
                }
            }
            .container{
                width: 100%;
                ul{
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    li{
                        position: relative;
                        box-sizing: border-box;
                        width: 24%;
                        height: 150px;
                        background-color: #fff;
                        margin-top: 15px;
                        transition: .5s;
                        cursor: pointer;
                        &:hover{
                            transform: translateY(-2px);
                            box-shadow: 0 0 5px #fff;
                        }
                        a{
                            display: block;
                            padding: 20px;
                            background: #fff;
                            color: #333;
                            img{
                                float: left;
                                width: 40px;
                                height: 40px;
                                border-radius: 100%;
                            }
                            h3{
                                overflow: hidden;
                                padding: 10px 15px 9px;
                                height: 21px;
                                font-weight: normal;
                            }
                            p{
                                clear: both;
                                display: -webkit-box;
                                overflow: hidden;
                                margin-top: 1rem;
                                height: 60px;
                                text-overflow: ellipsis;
                                font-size: 13px;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
