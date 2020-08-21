import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import MessagePlagin from '@/utils/message.plagin'
import TitlePlagin from '@/utils/title.plugin'
import 'materialize-css/dist/js/materialize.min.js'
import Loader from '@/components/app/v-loader.vue'
import Paginate from 'vuejs-paginate'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(MessagePlagin)
Vue.use(TitlePlagin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyAmUSNHZMwYjqmdABsUVCrwYYmPGXACIlo",
  authDomain: "vue-illi-crm.firebaseapp.com",
  databaseURL: "https://vue-illi-crm.firebaseio.com",
  projectId: "vue-illi-crm",
  storageBucket: "vue-illi-crm.appspot.com",
  messagingSenderId: "947318419178",
  appId: "1:947318419178:web:d422302d6f3c36a7b03193",
  measurementId: "G-R32X36TVLT"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
