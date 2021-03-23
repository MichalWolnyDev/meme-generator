<template>
  <div class="">
    <div class="">
      <div class="">
        <div class="">
          <div class="">
            <h2>
              Zarejestruj sie!
            </h2>
            <SignForm signType="register"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignForm from "@/components/SignForm.vue";

export default {
  name: 'Register',
  components: {
    SignForm
  },
}
</script>

<style lang="scss" scoped>

</style>
