import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import App from '../vue/App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter();

const opts = {};
const vuetify = new Vuetify(opts);

Vue.config.devtools = true;

new Vue({
    router: router,
    vuetify,
    render: createElement => createElement(App)
}).$mount('#app');