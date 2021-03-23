<template>
  <div class="">
    <div class="">
      <div class="">
        <div class="">
          <div class="">
            <h2>
              Zaloguj sie!
            </h2>
            <SignForm signType="login"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignForm from "@/components/SignForm.vue";

export default {
  name: 'Login',
  components: {
    SignForm
  },
}
</script>

<style lang="scss" scoped>

</style>
