
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Navbar from './components/navbar/index.vue'
import CarKey from './components/carKey/index.vue'
import api from '@/common/api.js'

Vue.prototype.$api = api;
Vue.component('navbar',Navbar);
Vue.component('carKey',CarKey);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif