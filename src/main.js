import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'
import VueDraggable from 'vue-draggable'
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';


Vue.use(Vuetify);
Vue.use(VueDraggable)
Vue.use(ElementUI);
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),
}).$mount('#app')
