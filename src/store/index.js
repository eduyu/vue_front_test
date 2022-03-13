import Vue from 'vue'
import Vuex from 'vuex'
// import cookies from 'vue-cookies'

import accounts from './modules/accounts'
import articles from './modules/articles'

// import axios from 'axios'

Vue.use(Vuex)

// axios.defaults.withCredentials = true

export default new Vuex.Store({
  modules: {
    accounts, articles,
  }
})
