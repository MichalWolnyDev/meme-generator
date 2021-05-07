<template lang="html">
  <div class="">
    <div class="card">
      <div class="">
        <div class="">
          <div class="card__avatar">
            <div class="card__avatar--img" @mouseover="avatarHover = true" @mouseleave="avatarHover = false" @click="addAvatar">
              <img v-if="!user.data.photoURL" src="@/assets/profile/avatar_placeholder.png"  alt="">
              <img v-else :src="user.data.photoURL"  alt="">
              <div class="card__avatar--upload" :class="{'active': avatarHover}">
                <span v-if="!user.data.photoURL">
                  Dodaj avatar
                </span>
                <span v-else>
                  Zmień avatar
                </span>
              </div>
            </div>
            <div class="drop" v-if="showDropzone">
              <vue-dropzone class="drop__here" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>
              <div class="drop__close" @click="showDropzone = false">
                <span>
                  X
                </span>
              </div>
            </div>
          </div>
          <div class="">
            <h2>
              {{ user.data.displayName }}
            </h2>
          </div>
          <div class="card__counters">
            <div class="card__counters--row">
              <div class="card__counters--col">
                <h4>
                  Dodanych memów:
                </h4>
                <p>
                  0
                </p>
              </div>
              <div class="card__counters--col">
                <h4>
                  Jarocoiny:
                </h4>
                <p>
                  0
                </p>
              </div>
            </div>
          </div>
          <div class="">
            <div class="">
              <button class="card__button" type="button" name="button">
                Usuń konto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vue2Dropzone from "vue2-dropzone"
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import firebase from "firebase";
export default {
  name: 'ProfileCard',
  components: {
    vueDropzone: vue2Dropzone
  },
  data(){
    return{
      avatarHover: false,
      showDropzone: false,
      dropzoneOptions: {
         url: 'https://httpbin.org/post',
         thumbnailWidth: 150,
         maxFilesize: 0.5,
         headers: { "My-Awesome-Header": "header value" },
         dictDefaultMessage: 'Dodaj avatar<br><br>( ͡° ͜ʖ ͡°)'
     }
    }
  },
  methods: {
    addAvatar(){
      this.showDropzone = !this.showDropzone;
    },
    async afterComplete(file){
      var that = this;
      try {
        const metaData = {
          contentType: "image/jpg"
        }
        const storageRef = firebase.storage().ref('users/'+that.user.data.uid+'/profile.jpg');
        var currUsr = firebase.auth().currentUser;

        await storageRef.put(file, metaData).then(() => {
          storageRef.getDownloadURL().then(imgUrl => {
            currUsr.updateProfile({
              photoURL: imgUrl
            }).then(() => {
              that.$store.commit("setUserAvatar", imgUrl);
              setTimeout(() => {
                that.showDropzone = false;
              }, 1000);
            }).catch((err) => {
              console.log(err);
            })
          });
        }).catch(err => {
          console.log(err);
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
}
</script>

<style lang="scss" scoped>
.card{
  max-width: 550px;
  min-height: 10vh;
  background-color: rgba(0,0,0,.5);
  padding: 3rem 1.4rem;

  &__avatar{
    display: flex;
    justify-content: center;

    &--img{
      max-width: 160px;
      text-align: center;
      transition: all .3s ease-in-out;
      position: relative;
      cursor: pointer;
    }
    &--upload{
      position: absolute;
      visibility: hidden;
      background-color: rgba(0,0,0,.8);
      height: 100%;
      width: 100%;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      &.active{
        visibility: visible;
      }
    }
    img {
      width: 100%;
       border-radius: 50%;
    }
  }

  &__counters{
    padding-bottom: 2rem;

    &--row{
      display: flex;
    }
    &--col{
      flex: 1;
    }
  }

  &__button{
    padding: 1rem 2rem;
    text-transform: uppercase;
    font-weight: 700;
    background-color: red;
    border: none;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
  }


}

.drop{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.8);

  &__here{
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(254, 44, 44, 0.8);
    border: none;
    color: #fff;
  }

  &__close{
    position: absolute;
    right: 50px;
    top: 20px;
    cursor: pointer;
    z-index: 99999;

    span {
      font-weight: 700;
      font-size: 3rem;
      color: #f00;
    }
  }
}
</style>
