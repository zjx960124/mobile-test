import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
import ElmentUI from 'element-ui'

import "./style/index.scss"
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont/iconfont.css'

import validation from "./components/validation";

import store from '@/utils/store';

Vue.use(ElmentUI)


Vue.config.productionTip = false;

Vue.prototype.$validation = validation;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
