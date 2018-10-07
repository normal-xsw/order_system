import Vue from 'vue'
import App from './App.vue'

//引入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

import Storage from './model/storage.js';
//console.log(window.location.hash.split('=')[1]);
var roomid = window.location.hash.split('=')[1]
Storage.set('roomid', roomid);     //保存房间号

//引入VueSocketio并使用
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://a.itying.com?roomid=' + roomid);       //绑定域名并加入分组

//引入路由并use
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//引入组件
import Start from './components/Start.vue';
import Search from './components/Search.vue';
import Pcontent from './components/Pcontent.vue';
import Order from './components/Order.vue';
import Hot from './components/Hot.vue';
import Home from './components/Home.vue';
import Cart from './components/Cart.vue';
import Editor from './components/Editor.vue';

//配置路由
const routes = [
  { path: '/start', component: Start },
  { path: '/search', component: Search },
  { path: '/pcontent', component: Pcontent },
  { path: '/order', component: Order },
  { path: '/hot', component: Hot },
  { path: '/home', component: Home },
  { path: '/cart', component: Cart },
  { path: '/editor', component: Editor },
  { path: '*', redirect: '/start'}
]

//实例化VueRouter
const router = new VueRouter({
  routes
})


new Vue({
  el: '#app',
  router,    //挂载路由
  render: h => h(App),
  sockets:{    //测试socket是否连接成功    
    connect: function(){
      console.log('socket connected')
    }
  }
})
