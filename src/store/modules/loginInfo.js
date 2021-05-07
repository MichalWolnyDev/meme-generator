const loginInfo = {
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    setLoggedIn(state, value){
      state.user.loggedIn = value
    },
    setUser(state, data){
      state.user.data = data
    },
    setUserAvatar(state, data){
      state.user.data.photoURL = data
    }
  },
  actions: {
    fetchUser({ commit }, user){
      commit("setLoggedIn", user !== null);
      if (user) {
        commit("setUser", {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        commit("setUser", null);
      }
    }
  }
}
export default loginInfo;
