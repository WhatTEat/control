// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from "./router"
import axios from "axios";
import VueAxios from "vue-axios";
//导入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.withCredentials = true
Vue.use(VueAxios,axios)

//使用element-ui组件
Vue.use(ElementUI);

Vue.use(VueRouter);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
