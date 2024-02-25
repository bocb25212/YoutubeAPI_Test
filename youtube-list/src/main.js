import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import waterfall from "vue-waterfall2";

Vue.config.productionTip = false
Vue.prototype.$axios= axios;
Vue.use(waterfall);

new Vue({
  axios,
  render: h => h(App)
}).$mount('#app');
