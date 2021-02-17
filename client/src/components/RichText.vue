<template>
    <div>
        <textarea id="demo" style="display: none;"></textarea>
        <button type="button" class="layui-btn layui-btn-normal" @click="handleClick">提交留言</button>
    </div>
</template>

<script>
    /* 编辑器代码放在这时，当从其他页面进入留言页面时，该部分代码都会被重新调用--即每次进入留言页面富文本编辑器都需要刷新进行加载
    layui.use('layedit', function(){
        var layedit = layui.layedit;
        var indes = layedit.build('demo',{
            tool : ['face']
            }); //建立编辑器
    }); */
    export default {
        name: 'RichText',
        data() {
            return {
                // 将数据和点击事件进行绑定
                // layedit 是在编辑器代码中定义出来的，所以也只能放在外面才能被访问到
                layedit : null,
                index : 0
            }
        },
        methods: {
            handleClick(){
                this.$emit("sub",this.layedit.getContent(this.index));
            }
        },

        // 实例被挂载后调用
        mounted() {
            // 在mounted中写入编辑器代码以解决重新加载的问题
            layui.use('layedit', ()=>{
                this.layedit = layui.layedit;
                // this 指向当前组件的实例
                this.index = this.layedit.build('demo',{
                    tool : ['face']
                }); //建立编辑器
            });
        },
    }
</script>

<style scoped lang="less">
    
</style>
