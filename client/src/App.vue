<template>
	<div id="root">
		<router-view/>
	</div>
</template>

<style lang="less">
    // 全局引入css初始样式
	@import "assets/css/reset.css";
	// 引入字体样式
	@import "assets/css/font.css";
	#root{
		width: 100%;
		background: url("./assets/img/bg1.jpg") center top/cover fixed; // 水平居中 垂直居上/覆盖页面 固定
	}
</style>
