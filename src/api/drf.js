// const HOST = 'http://localhost:8000/api/v1/'
const HOST = 'https://eduneo.link/api/v1/'

const ACCOUNTS = 'accounts/'
const ARTICLES = 'articles/'
const COMMENTS = 'comments/'

export default {
  accounts: {
    loginUrl: () => HOST + ACCOUNTS + 'login/',
    logoutUrl: () => HOST + ACCOUNTS + 'logout/',
    signupUrl: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    currentUserInfoUrl: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profileUrl: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  articles: {
    articles: () => HOST + ARTICLES,
    article: articlePk => HOST + ARTICLES + `${articlePk}/`,
    likeArticle: articlePk => HOST + ARTICLES + `${articlePk}/` + 'like/',
    comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
    comment: (articlePk, commentPk) =>
      HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,
  },
}
