import axios from 'axios'
import router from '@/router'
import drf from '@/api/drf'

// axios.get, axios.delete => (url, config)
// axios.post, axios.put => (url, data, config)

export default {
  state: {
    articles: [],
    article: {}
  },

  getters: {
    articles: state => state.articles,
    article: state => state.article,
    isAuthor: (state, rootGetters) => {
      // state.article.user.username === rootGetters.currentUser.user.username
      state.article.user?.username === rootGetters.currentUser?.user?.username
    }
  }, 

  mutations: {
    SET_ARTICLES: (state, articles) => state.articles = articles,
    SET_ARTICLE: (state, article) => state.article = article,
    SET_ARTICLE_COMMENTS: (state, comments) => state.article.comments = comments,
  },

  actions: {
    fetchArticles({ commit, rootGetters }) {
      axios.get(drf.articles.articles(), rootGetters.config)
      .then(res => {
        commit('SET_ARTICLES', res.data)
      })
      .catch(err => console.error(err.response))
    },
    
    fetchArticle({ commit, rootGetters }, { articlePk }) {
      axios.get(drf.articles.article(articlePk), rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE', res.data)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
      },
      
    createArticle({ commit, getters, rootGetters }, { title, content }){
      const body = { title, content }
      axios.post(drf.articles.articles(), body, rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE', res.data)
          router.push({ name: 'article', params: { articlePk: getters.article.pk }})
        })
        .catch(err => console.error(err.response))

    },

    updateArticle({ commit, getters, rootGetters }, { title, content, articlePk }) {
      const body = { title, content }
      axios.put(drf.articles.article(articlePk), body, rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE', res.data)
          router.push({ name: 'article', params: { articlePk: getters.article.pk }})
        })
        .catch(err => console.error(err.response))
    },

    deleteArticle({ commit, rootGetters }, { articlePk }) {
      axios.delete(drf.articles.article(articlePk), rootGetters.config)
        .then(() => {
          commit('SET_ARTICLE', {})
          router.push({ name: 'articles' })
        })
        .catch(err => console.error(err.response))
    },

    likeArticle({ commit, rootGetters }, { articlePk }) {
      axios.post(drf.articles.likeArticle(articlePk), {}, rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE', res.data)
        })
        .catch(err => console.error(err.response))
    },

    createComment({ commit, rootGetters }, { articlePk, content }) {
      const body = { content }
      axios.post(drf.articles.comments(articlePk), body, rootGetters.config)
        .then(res => {
           commit('SET_ARTICLE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    updateComment({ commit, rootGetters }, { articlePk, commentPk, content }) {
      const body = { content }
      axios.put(drf.articles.comment(articlePk, commentPk), body, rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

    deleteComment({ commit, rootGetters }, { articlePk, commentPk }) {
      axios.delete(drf.articles.comment(articlePk, commentPk), rootGetters.config)
        .then(res => {
          commit('SET_ARTICLE_COMMENTS', res.data)
        })
        .catch(err => console.error(err.response))
    },

  },
}