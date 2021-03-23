<template lang="html">
  <div class="">
    <div id="nav" class="nav">
      <div class="nav__flex">
        <div class="logo">
          <div class="logo__flex">
            <div class="">
              <router-link to="/">
                <img class="logo__img" src="../assets/logo.gif" alt="">
              </router-link>
            </div>
            <div class="logo__text">
              <p>
                Generator Memow
              </p>
            </div>
          </div>
        </div>
        <div class="nav__menu">
          <template v-if="!user.loggedIn">
            <router-link to="/">Jarocoelho</router-link> |
            <router-link to="/gallery">Galeria</router-link> |
            <router-link to="/login">Zaloguj</router-link> |
            <router-link to="/register">Rejestracja</router-link>
          </template>
          <template v-else>
            <router-link to="/">Jarocoelho</router-link> |
            <router-link to="/gallery">Galeria</router-link> |
            <router-link to="/profile">{{ user.data.displayName }}</router-link> |
            <a href="" @click.prevent="signOut">Wyloguj</a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name: "Nav",
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    signOut(){
      console.log("asdasd");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "/gallery"
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.nav{
  padding: 2rem 0;

  &__flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__menu{
    a {
      font-weight: bold;
      color: #fff;
      text-decoration: none;
      font-size: 18px;

      &.router-link-exact-active {
        color: #f00;
      }
    }
  }
}
.logo{
  &__img{
    max-width: 80px;
  }
  &__flex{
    display: flex;
    align-items: center;
  }
  &__text{
    margin-left: 1rem;
    font-size: 2rem;
  }
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 10s linear infinite;
  -moz-animation: rotating 10s linear infinite;
  -ms-animation: rotating 10s linear infinite;
  -o-animation: rotating 10s linear infinite;
  animation: rotating 10s linear infinite;
}
</style>
