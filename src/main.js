// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import VueSocketio from 'vue-socket.io';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'


const socketUrl = 'http://localhost:3000'
Vue.prototype.$ajax = axios
// Vue.prototype.$qiniu = qiniu

Vue.prototype.$baseUrl = 'http://localhost:20001'


Vue.use(ElementUI)
Vue.use(VueSocketio, socketUrl);

Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
