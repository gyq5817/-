<template>
    <div class="Diary">
        <Nav></Nav>
        <div class="diary-main">
            <el-timeline>
                <el-timeline-item 
                    v-for="item in diaryList"
                    :timestamp="item.date"
                    placement="top"
                    :reverse="false"
                >
                    <el-card>
                        <p>{{item.txt}}</p>
                        <img v-for="i in item.img" 
                            :src="i" 
                            width="100%" 
                            alt=""
                        >
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import Nav from '../../components/Nav'
    export default {
        name: 'Diary',
        data() {
            return {
                diaryList : [
                    {txt:"这是我写的第1篇日志。",img:["http://localhost:3000/img/diary/00.jpg"],date:"2019/4/15"},
                    {txt:"这是我写的第2篇日志。",img:["http://localhost:3000/img/diary/01.jpg"],date:"2019/5/15"},
                    {txt:"这是我写的第3篇日志。",img:["http://localhost:3000/img/diary/02.jpg"],date:"2019/6/15"},
                    {txt:"这是我写的第4篇日志。",img:["http://localhost:3000/img/diary/03.jpg"],date:"2020/4/15"},
                    {txt:"这是我写的第5篇日志。",img:["http://localhost:3000/img/diary/04.jpg"],date:"2020/4/16"},
                ]
            }
        },
        components:{
            Nav
        }
    }
</script>

<style scoped lang="less">
    .Diary{
        box-sizing: border-box;
        max-width: 1360px;
        width: 100%;
        padding: 80px 70px;
        margin: 0 auto;
        .diary-main{
            box-sizing: border-box;
            width: 100%;
            padding: 30px 8% 30px 20%;
            background-color: #fff;
            .el-timeline{
                /deep/ .el-timeline-item__timestamp{
                position: absolute;
                top: -8px;
                left: -134px;
                font-size: 20px;
                font-weight: bolder;
                color: #6bc30d;
                }
                .el-timeline-item{
                    .el-card{
                        p{
                            font-size: 16px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
    
</style>
