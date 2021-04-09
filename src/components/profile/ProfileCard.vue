<template lang="html">
  <div class="">
    <div class="card">
      <div class="">
        <div class="">
          <div class="card__avatar">
            <div class="card__avatar--img" @mouseover="avatarHover = true" @mouseleave="avatarHover = false" @click="addAvatar">
              <img src="@/assets/profile/avatar_placeholder.png"  alt="">
              <div class="card__avatar--upload" :class="{'active': avatarHover}">
                <span>
                  Dodaj avatar
                </span>
              </div>
            </div>
            <div class="" v-if="showDropzone">
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
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
         headers: { "My-Awesome-Header": "header value" }
     }
    }
  },
  methods: {
    addAvatar(){
      this.showDropzone = !this.showDropzone;
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
</style>
