import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import Showcase2 from './components/Showcase2';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/LandingPage';
import Events from './components/Events';
import ProjectLog from './components/ProjectLog';
import Project from './components/ProjectPage';
import ProjectSubmissionPage from './components/ProjectSubmissionPage';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import ThankYou from './components/ThankYou';

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Landing}, 
  {path: '/showcase', component: Showcase2},
  {path: '/homepage', component: HomePage},
  {path: '/signup', component: SignUp},
  {path: '/login', component: Login},
  {path: '/events', component: Events},
  {path: '/projectlog', component: ProjectLog},
  {path: '/project', component: Project},
  {path: '/projectsubmissionpage', component: ProjectSubmissionPage},
  {path: '/forgotpassword', component: ForgotPassword},
  {path: '/profile', component: Profile},
  {path: '/success', component: ThankYou}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
