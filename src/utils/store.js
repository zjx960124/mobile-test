import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      user: null
  },
  mutations: {
      updateUser(state, data){
          state.user = data;
      }
  }
})

export default store