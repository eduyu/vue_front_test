import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export default {
  state: {
    token: localStorage.getItem('token') || '',
    currentUser: {},
    profile: {},
    authError: null,
  }, 

  getters: {
    isLoggedIn: state => !!state.token,
    config: state => ({ headers: { Authorization: `Token ${state.token}` } }),
    currentUser: state => state.currentUser,
    profile: state => state.profile,
    authError: state => state.authError,
    isAuthError: state => !!state.authError,
  }, 

  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_AUTH_ERROR: (state, error) => state.authError = error, 
  },

  actions: {
    login({ commit, dispatch }, credentials) {
      axios.post(drf.accounts.loginUrl(), credentials)
        .then(res => { 
          const token = res.data.key
          // Token setting
          commit('SET_TOKEN', token)
          localStorage.setItem('token', token)
          // currentUser setting
          dispatch('getCurrentUser')
          // page 이동
          router.push({ name: 'articles' })
        })
        .catch(err => {
          // console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    signup({ commit, dispatch }, credentials) {
      axios.post(drf.accounts.signupUrl(), credentials)
        .then(res => { 
          const token = res.data.key
          commit('SET_TOKEN', token)
          localStorage.setItem('token', token)
          dispatch('getCurrentUser')
          router.push({ name: 'articles' })
        })
        .catch(err => {
          // console.log(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    logout({ commit, getters }) {
      axios.post(drf.accounts.logoutUrl(), {}, getters.config)
        .then(() => {
          commit('SET_TOKEN', '')
          localStorage.setItem('token', '')
          alert('성공적으로 logout 되었습니다.')
          router.push({ name: 'login' })
        })
        .catch(err => console.error(err))
    },

    fetchCurrentUser({ commit, getters }) {
      if (getters.isLoggedIn) {
        axios.get(drf.accounts.currentUserInfoUrl(), getters.config)
        .then(res => {
          commit('SET_CURRENT_USER', res.data)
        })
      }
    },

    fetchProfile({ commit, getters }, { username }) {
      axios.get(drf.accounts.profileUrl(username), getters.config)
        .then(res => {
          commit('SET_PROFILE', res.data)
        })
    } 

  },
}