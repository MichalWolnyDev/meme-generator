const firebase_module = {
  state: () => ({
    memes: null,

  }),
  mutations: {
    setMemes(state, data){
      state.memes = data;
    }
  },
  actions: {
    getMemes({commit}){
      let employeesData = [];
      this._vm.$db.collection("memes")
       .get()
       .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
          employeesData.push({
             img: doc.data().img,
             tags: doc.data().tags,
           });
           console.log(doc.id, " => ", doc.data());
         });
         commit('setMemes', employeesData);

         var finalArray = employeesData.map(function (obj) {
           return "http://localhost:2000/gallery/"+obj.img;
         });
         commit('setLightBoxImages', finalArray);

       })
       .catch((error) => {
         console.log("Error getting documents: ", error);
       });
    }
  },
  getters: {
    getMemes(state){
      return state.memes;
    },
  }
}

export default firebase_module;
