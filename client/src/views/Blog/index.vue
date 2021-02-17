<template>
    <div class="Blog">
        <!-- 挂载定义好的 Nav 复用组件 -->
        <Nav></Nav>
        <!-- 挂载定义好的 Container 组件 -->
        <Container></Container>
    </div>
</template>

<script>
    // 引入定义好的 Nav 复用组件
    import Nav from '../../components/Nav';
    // 引入定义好的 Container 组件
    import Container from '../../components/Container'
    export default {
        name: 'Blog',
        // 注册定义好的 Nav Container 组件
        components:{
            Nav,Container
        }
    }
</script>

<style scoped>

</style>
