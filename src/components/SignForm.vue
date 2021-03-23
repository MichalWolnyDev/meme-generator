<template>
  <div class="">
    <div class="sign">
      <form class="sign__form" action="#" @submit.prevent="submit">
        <div class="sign__input" v-if="signType != 'login'">
          <label for="name">Nick</label>
          <div class="">
            <input class="" type="name" name="name" value="" required autofocus v-model="form.name">
          </div>
        </div>
        <div class="sign__input">
          <label for="email">E-mail</label>
          <div class="">
            <input class="" type="email" name="email" value="" required autofocus v-model="form.email">
          </div>
        </div>
        <div class="sign__input">
          <label for="password">Haslo</label>
          <div class="">
            <input class="" type="password" name="password" value="" required autofocus v-model="form.password">
          </div>
        </div>
        <div class="">
          <div class="">
            <button class="sign__button" type="submit" name="button">
              Jazda!
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'SignForm',
  props: ['signType'],
  data(){
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    }
  },
  methods: {
    submit(){
      if (this.signType == 'register') {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.form.name
              })
              .then(() => {});
          })
          .catch(err => {
            this.error = err.message;
          })
      } else if (this.signType == 'login'){
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            this.$router.replace({ name: 'Profile'});
            console.log(data);
          })
          .catch(err => {
            this.error = err.message;
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign{

  &__form{
    display: inline-block;
    padding: 1rem;
    box-shadow: 0px 0px 21px 6px rgb(255 8 41 / 55%);
  }
  &__input{
    margin-bottom: 20px;
    & label{
      margin-bottom: 10px;
    }
    & input{
      min-width: 250px;
      min-height: 40px;
      background-color: transparent;
      color: #fff;
      border: none;
      border-bottom: 1px solid #fff;
    }
  }
  &__button{
    min-width: 250px;
    min-height: 40px;
    border-radius: 10px;
    background-color: #f78539;
    border: none;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
