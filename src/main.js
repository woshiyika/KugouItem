import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tab, Tabs } from 'vant';
import { Button } from 'vant';
import { Slider } from 'vant';

Vue.use(Slider);

Vue.use(Button);

Vue.use(Tab);
Vue.use(Tabs);

Vue.config.productionTip = false

import './assets/font/iconfont.css'
import "swiper/dist/css/swiper.min.css"


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')