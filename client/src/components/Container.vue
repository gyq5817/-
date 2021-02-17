<template>
    <div id="Container">
        <el-container>
        <el-main>
            <!-- 挂载子组件 -->
            <ArticleShow></ArticleShow>
        </el-main>
        <el-aside>
            <!-- 给search加class名-fixed，通过改变ifSearchFixed的布尔值判断search是否有fixed名字 -->
            <div :class="['search',{'fixed':ifSearchFixed}]">
                <div class="search-main">
                    <input type="text" v-model="searchInput" placeholder="请输入搜索内容">
                    <i class="el-icon-search"></i>
                </div>
                <div class="search-article">
                    <ul @mouseleave="handleMouseleave">
                        <li @mouseenter="handleMouseenter(index)" v-for="(item,index) in getArticleTags"><router-link :to="'/blog/'+index">{{item}}</router-link></li>
                    </ul>
                    <!-- 在设置滚轮时，没有必要使用JQuery代码，因为没有必要---所有操作都可以换成数据的操作 -->
                    <div class="cover" :style="{top:coverIndex*40+'px'}"></div>
                </div>
            </div>
            <div class="hot">
                <h3>热门文章</h3>
                <ul>
                    <li v-for="(item,index) in articleHot">
                        <i>{{index+1}}</i>
                        <a :href="item._id">{{item.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="recommend">
                <h3>置顶推荐</h3>
                <ul>
                    <li v-if="!!getArticleRecommend.title">
                        <i>{{1}}</i>
                        <a :href="getArticleRecommend._id">{{getArticleRecommend.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="visitor">
                <h3>最近访客</h3>
                <ul>
                    <li v-for="item in visitor" :style="{backgroundImage:'url('+item.photo+')'}">
                        <p>{{item.user}}</p>
                    </li>
                </ul>
            </div>
        </el-aside>
        </el-container> 
    </div>
</template>

<script>
    // 引入子组件
    import ArticleShow from "./ArticleShow";

    import request from '../api/index'
    let getArticleInfo = request.getArticleInfo;
    let getArticleHot = request.getArticleHot;

    export default {
        name: 'Container',
        data() {
            return {
                // 搜索框 v-model
                searchInput : "",
                // 控制search的class名字
                ifSearchFixed : false,
                // 文章分类（tags）
                articleTags : [],
                // cover条的top值
                coverIndex : this.$route.params.id*1,
                // 热门文章列表
                articleHot : [],
                // 假设这是最近访客的数据
                visitor : [
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                    {user:"大夫",photo:"http://localhost:3000/img/defaultPhoto.jpg"},
                ]
            }
        },
        computed: {
            getArticleTags(){
                return ["全部文章",...this.articleTags];
            },
            getArticleRecommend(){
                return this.articleHot[0] || {};
            },
        },
        methods:{
            handleMouseenter(index){
                this.coverIndex = index;
            },
            handleMouseleave(){
                this.coverIndex = this.$route.params.id*1; // 鼠标移开，回到原位置
            },
            // 滚动事件函数
            handleWindowScroll(){
                // 获取滚动高度
                let scrollTop = document.documentElement.scrollTop;
                // 滚动高度>=900时，search有fixed名字
                this.ifSearchFixed = scrollTop>=1200; // >= 比较运算符返回布尔值
            }
        },
        // 注册子组件
        components:{
            ArticleShow
        },
        created() {
            // 请求文章的分类
            getArticleInfo()
                .then(res=>{
                    this.articleTags = res.data.data.tags;
                });
            getArticleHot()
                .then(res=>{
                    this.articleHot = res.data.data;
                });
        },
        mounted() {
            // 页面刷新时，自动执行1次
            this.handleWindowScroll();
            // 监听window的滚动事件，以判定search是否有fixed名字
            window.addEventListener("scroll",this.handleWindowScroll)
        },
        destroyed() {
            // 离开当前页面时，清除掉滚动事件
            window.removeEventListener("scroll",this.handleWindowScroll)
        },
    }
</script>

<style scoped lang="less">
    #Container{
        padding-top: 80px;
        width: 100%;
        user-select: none;
        >.el-container{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            height: 100%;
            margin: 0 auto;
            padding: 0 50px;
            >.el-main{
                padding-top: 0;
                padding-left: 0;
            }
            >.el-aside{
                width: 300px;
                /* height: 1000px; */
                /* background-color: aqua; */
                >.search{
                    width: 100%;
                    background-color: #fff;
                    padding-bottom: 20px;
                    &.fixed{
                        position: fixed;
                        z-index: 3; // 设置元素的堆叠顺序
                        width: 300px;
                        animation: searchMove .5s 1; // 0.5s完成 执行1次
                        animation-fill-mode: forwards; // 过度动画执行完成，保持最后状态
                    }
                    @keyframes searchMove { // 添加带有弹出效果的过度动画
                        0%{top : -500px}
                        40%{top : 81px}
                        70%{top : 60px}
                        100%{top : 81px}
                    }
                    .search-main{
                        position: relative;
                        box-sizing: border-box;
                        width: 100%;
                        height: 80px;
                        padding: 20px;
                        background-color: grey;
                        input{
                            width: 100%;
                            height: 40px;
                            border-radius: 20px; // 添加圆角
                            border: 0;
                            outline: 0;
                            text-indent: 2em; // 设置2字符的缩进
                        }
                        i{
                            position: absolute;
                            right: 35px;
                            top: 29px;
                            width: 22px;
                            height: 22px;
                            font-size: 18px;
                            line-height: 22px;
                            text-align: right;
                            font-weight: bolder;
                            color: rgb(120, 121, 119);
                            cursor: pointer;
                        }
                    }
                    .search-article{
                        position: relative;
                        width: 100%;
                        margin-top: 20px;
                        ul{
                            width: 100%;
                            li{
                                position: relative;
                                box-sizing: border-box;
                                z-index: 1;
                                width: 100%;
                                height: 40px;
                                line-height: 40px;
                                padding: 0 30px;
                                a{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    color: #787977;
                                    border-bottom: 1px dotted #eee;
                                }
                            }
                        }
                        .cover{
                            box-sizing: border-box;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 40px;
                            border-right: 5px solid #000;
                            background-color:  rgba(0, 0, 0, .05);
                            transition: top .3s;
                        }
                    }
                }
                >.hot,.recommend{
                    box-sizing: border-box;
                    width: 100%;
                    margin-top: 20px;
                    background-color: #fff;
                    padding: 15px 20px 20px;
                    h3{
                        padding: 0 5px 10px;
                        line-height: 30px;
                        font-weight: 400;
                        border-bottom: 1px solid #e8e9e7;
                        color: #383937;
                        position: relative;
                        font-size: 18px;
                    }
                    ul{
                        margin-top: 15px;
                        li{
                            height: 30px;
                            line-height: 30px;
                            margin: 7px 0;
                            a{
                                color: #787977;
                                font-size: 14px;
                                text-decoration: none;
                                &:hover{
                                    color: #6bc30d;
                                    text-decoration: underline;
                                }
                            }
                            i{
                                display: inline-block;
                                width: 22px;
                                height: 22px;
                                margin-right: 10px;
                                font-style: normal;
                                font-size: 12px;
                                color: #666;
                                line-height: 22px;
                                text-align: center;
                                border-radius: 100%;
                                background-color: #edefee;
                                text-shadow: 0 1px 0 rgba(255, 255, 255, 5);
                            }
                            &:nth-child(1) i{
                                background-color: #e24d46;
                                color: #fff;
                            }
                            &:nth-child(2) i{
                                background-color: #2ea7e0;
                                color: #fff;
                            }
                            &:nth-child(3) i{
                                background-color: #6bc30d;
                                color: #fff;
                            }
                        }
                    }
                }
                >.visitor{
                    box-sizing: border-box;
                    width: 100%;
                    margin-top: 20px;
                    background-color: #fff;
                    padding: 15px 20px 20px;
                    h3{
                        padding: 0 5px 10px;
                        line-height: 30px;
                        font-weight: 400;
                        border-bottom: 1px solid #e8e9e7;
                        color: #383937;
                        position: relative;
                        font-size: 18px;
                    }
                    ul{
                        margin-top: 10px;
                        li{
                            position: relative;
                            float: left;
                            width: 23%;
                            height: 60px;
                            margin: 1%;

                            background-position: center top;
                            background-size: cover;
                            background-repeat: no-repeat;

                            p{
                                overflow: hidden;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                background-color: rgba(0, 0, 0, .3);
                                color: #fff;
                                font-size: 12px;
                            }
                        }
                        &::after{
                            display: block;
                            content: '';
                            width: 0;
                            height: 0;
                            clear: both;
                        }
                    }
                }
            }
        }
    }
</style>
