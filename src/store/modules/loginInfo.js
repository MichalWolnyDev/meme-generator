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
    }
  },
  actions: {
    fetchUser({ commit }, user){
      commit("setLoggedIn", user !== null);
      if (user) {
        console.log(user);
        commit("setUser", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("setUser", null);
      }
    }
  }
}
export default loginInfo;
