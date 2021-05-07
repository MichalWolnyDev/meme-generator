import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from 'vue-carousel';
import InputTag from 'vue-input-tag'


import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from '@/firebaseConfig'
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("fetchUser", user);
  } else{
    store.commit("setLoggedIn", false);
    store.commit("setUser", null);
    console.log("Uzytkownik wylogowany");
  }
})


Vue.prototype.$db = firebase.firestore();
Vue.prototype.$fbStorage = firebase.storage();
Vue.use(VCalendar, VueAxios, axios, VueCarousel);
Vue.component('input-tag', InputTag)
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$axios = axios
axios.defaults.baseURL = "api"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
