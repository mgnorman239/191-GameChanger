import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/LandingPage';
import Events from './components/Events';

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Landing}, //Replace this with a landing page
  {path: '/homepage', component: HomePage},
  {path: '/signup', component: SignUp},
  {path: '/login', component: Login},
  {path: '/events', component: Events}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
