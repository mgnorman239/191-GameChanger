import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import Showcase2 from './components/Showcase2';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp'
import Login from './components/Login';
import Landing from './components/LandingPage';
import Events from './components/Events';
import ProjectLog from './components/ProjectLog';
import Project from './components/ProjectPage';
import ProjectSubmissionPage from './components/ProjectSubmissionPage';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import ThankYou from './components/ThankYou';
import LogSubmission from './components/LogSubmission';
import UserSettings from './components/UserSettings';

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Landing}, 
  {path: '/showcase', component: Showcase2},
  {path: '/homepage', component: HomePage},
  {path: '/signup', component: SignUp},
  {path: '/confirmsignup', component: ConfirmSignUp},
  {path: '/login', component: Login},
  {path: '/events', component: Events},
  {path: '/projectlog', component: ProjectLog},
  {path: '/project/:title', name: 'Project', component: Project},
  {path: '/projectsubmissionpage', component: ProjectSubmissionPage},
  {path: '/forgotpassword', component: ForgotPassword},
  {path: '/profile/:username', component: Profile, name: 'Profile'},
  {path: '/success/', component: ThankYou, name: 'Success'},
  {path: '/logsubmission', component: LogSubmission},
  {path: '/usersettings/:username', component: UserSettings, name: 'Settings'}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
