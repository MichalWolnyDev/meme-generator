<template>
  <div class="">
    <div class="popup popup__shadow" :class="{ error: !isSuccess }">
      <div class="">
        <div class="popup__content">
            <p class="popup__text">
              {{ msg }}
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: ['isSuccess','msg']
}
</script>

<style lang="scss" scoped>
.popup{
  background-color: green;
  position: fixed;
  top: 2vw;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;

  &.error{
    background-color: red;
  }

  &__content{
    display: flex;
    padding: 0 4rem;
  }

  &__text{
    font-size: 1.5rem;
  }

  &__shadow{
    -webkit-box-shadow: 0px 0px 31px 0px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 0px 31px 0px rgba(0,0,0,0.57);
    box-shadow: 0px 0px 31px 0px rgba(0,0,0,0.57);
  }
}
</style>
