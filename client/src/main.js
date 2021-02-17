import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Container,Main,Aside,Icon,MessageBox,Form,FormItem,Input,Link,Timeline,TimelineItem,Card,Message,Popover} from 'element-ui'; // 引入 element Button 按钮

Vue.use(Button)
	.use(Container)
	.use(Main)
  .use(Aside)
  .use(Icon)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Link)
  .use(Timeline)
  .use(TimelineItem)
  .use(Card)
  .use(Popover)
; // 挂载 Button...
Vue.prototype.$msgbox = MessageBox; // 注册MessageBox组件中的自定义弹窗
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
