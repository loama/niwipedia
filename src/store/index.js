import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  article: {
    title: 'gefgdefgnfdsgfdfsegfndsafbgdfsafdsfgfdffdsfdsfs',
    stickyTitleTransparent: true
  }
}

const mutations = {
  articleTitle (state, payload) {
    state.article.title = payload
  },
  articleTransparency (state, payload) {
    state.article.stickyTitleTransparent = payload
  }
}

const actions = {
  articleTitle (context, payload) {
    context.commit('articleTitle', payload)
  },
  articleTransparency (context, payload) {
    context.commit('articleTransparency', payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
