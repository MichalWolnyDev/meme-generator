<template>
  <div class="">
    <div class="container">
      <!-- <Jaro /> -->
      <div class="flex">
        <div class="flex__col">
          <Form @clicked="setFormData" @download="startDownload"/>
        </div>
        <div class="flex__col">
          <GenerateCanvas :memeData="form" :getMeme="download"/>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Popup v-if="getShowPopup.show" :isSuccess="getShowPopup.success" :msg="getShowPopup.msg"/>
    </transition>
<!--  -->
  </div>
</template>

<script>
// import Jaro from '@/components/Jaro.vue'
import Form from '@/components/Form.vue'
import GenerateCanvas from '@/components/GenerateCanvas.vue'
import Popup from '@/components/Popup.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    // Jaro,
    Form,
    GenerateCanvas,
    Popup
  },
  data() {
    return {
      form: null,
      download: false
    }
  },
  methods: {
    setFormData(val){
      this.form = val;
    },
    startDownload(val){
      this.download = val;
    }
  },
  computed: {
    ...mapGetters([
      'getShowPopup'
    ])
  },
}
</script>

<style lang="scss">
  .container{
    max-width: 1450px;
    margin: 0 auto;
  }
  .flex{
    display: flex;

    &__col{
      flex: 1;
      padding: 1rem;
    }

    @media(max-width: 960px){
      display: block;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
