<template>
  <div class="">
    <div class="" v-if="user.loggedIn">
      Zalogowano! <br>
      Witaj {{ user.data.displayName }}!
    </div>
    <div class="" v-else>
      Nie jesteś zalogowany!
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted(){
    console.log(this.user);
  }
}
</script>

<style lang="scss" scoped>
</style>
