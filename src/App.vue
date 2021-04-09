<template>
  <div id="app">
    <CoolLightBox
      :items="getLightBoxImages"
      :index="getImageIndex"
      @close="closeLightbox(null)">
    </CoolLightBox>
    <div class="container">
      <Nav />
      <router-view/>
    </div>

  </div>
</template>

<script type="text/javascript">
import Nav from '@/components/Nav.vue'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import { mapGetters } from 'vuex'
  export default {
    components: {
      Nav,
      CoolLightBox
    },
    data() {
      return {
        images: [],
        index: null
      }
    },
    methods: {
      closeLightbox(val){
        this.$store.dispatch('imageIndex', val);
      }
    },
    computed: {
      ...mapGetters([
        'getLightBoxImages',
        'getImageIndex'
      ])
    },
    mounted() {
      this.$store.dispatch('getMemes');
    }
  }
</script>

<style lang="scss">
@import 'assets/fonts/stylesheet.css';
*,::before, ::after{
  box-sizing: border-box;
}
body, html{
  padding: 0;
  margin: 0;
  // background-color: #000;
  color: #fff;
  background-image: url('assets/bg-bw.jpg');
}
#app {
  font-family: 'Ink Free';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container{
  max-width: 1450px;
  margin: 0 auto 3rem;
  @media(max-width: 1500px){
    padding: 0 1rem;
  }
}
.vue-input-tag-wrapper .input-tag{
  font-family: 'Calibri', sans-serif;
  background-color: #f00!important;
  color: #fff!important;
  border: 1px solid #f00!important;
  padding: .5rem!important;
  border-radius: 50px!important;
}
.vue-input-tag-wrapper .input-tag .remove{
  color: #000!important;
}
</style>
