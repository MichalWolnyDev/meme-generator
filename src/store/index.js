import Vue from 'vue'
import Vuex from 'vuex'
import firebase_module from './modules/memes'
import loginInfo from './modules/loginInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isGenerated: false,
    lightBoxImages: [],
    imageIndex: null,
    showPopup: {
      show: false,
      success: false,
      msg: ""
    }
  },
  mutations: {
    setGenerated(state, data){
      state.isGenerated = data;
    },
    setImageIndex(state, data){
      state.imageIndex = data;
    },
    setLightBoxImages(state, data){
      state.lightBoxImages = data;
    },
    setShowPopup(state, data){
      state.showPopup = data;
    },

  },
  getters: {
    getGenerated(state){
      return state.isGenerated;
    },
    getImageIndex(state){
      return state.imageIndex;
    },
    getLightBoxImages(state){
      return state.lightBoxImages;
    },
    getShowPopup(state){
      return state.showPopup;
    },

  },
  actions: {
    generateInfo({commit}, val){
      commit('setGenerated', val);
    },
    imageIndex({commit}, val){
      commit('setImageIndex', val);
    },
    showPopup({commit}, val){
      commit('setShowPopup', {
        show: val.show,
        success: val.success,
        msg: val.msg
      });
    }
  },
  modules: {
    firebase_module,
    loginInfo
  }
})
