<template lang="html">
  <div class="gallery">

    <div class="">
      <div class="filter">
        <input-tag v-model="tags" placeholder="Tagi:"></input-tag>
      </div>
      <div class="gallery__flex">
        <div class="gallery__item" v-for="(image, id) in tags.length > 0 ? getMemes.filter( e => e.tags.some( r => tags.includes(r))) : getMemes" :key="id" @click="sendImgIndex(id)">
          <img class="gallery__img" :src="'http://localhost:2000/gallery/'+image.img" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 data() {
   return{
     index: null,
     tags: []
   }
 },
 methods: {
   sendImgIndex(val){
     this.$store.dispatch('imageIndex', val);
   }
 },
 computed: {
   ...mapGetters([
     'getMemes'
   ])
 },
 mounted(){
   this.$store.dispatch('getMemes');
 }

}
</script>

<style lang="scss" scoped>
.gallery{
  &__flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  &__item{
    flex: 0 1 32%;
    margin: 0 3px;
    @media(max-width: 960px){
      flex: 0 1 49%;
      margin: 3px;
    }
    @media(max-width: 650px){
      flex: 0 1 100%;
    }
  }
  &__img{
    width: 100%;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover{
      transform: scale(1.03);
    }
  }

  margin-bottom: 2rem;
}

.filter{
  margin-bottom: 2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
