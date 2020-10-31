import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,  // 开启严格模式  确保state 中的数据只能 mutations 修改,小知识点
  state: {
    flag: 0,
    timer:false
  },
  mutations: {
    addFlagNum(state) {
      state.flag++
    },
    reduceFlagNum(state) {
      state.flag--
    },
    flagCE(state){
      state.flag = 0
    }
  },
  actions: {
    addFlagVal(context) {
      // this.$store.commit("addFlagNum")
      context.commit("addFlagNum")
    },
    reduceFlagVal(context) {
      // this.$store.commit("reduceFlagNum")
      context.commit("reduceFlagNum")
    },
    flagCE(context){
      context.commit("flagCE")
    }
  },
  modules: {
  }
})
