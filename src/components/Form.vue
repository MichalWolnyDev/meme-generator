<template lang="html">
  <div class="">
    <div class="input">
      <label for="sentence">Tekst Jarka</label>
      <textarea class="input__transparent input__shadow" name="sentence" v-model="formData.sentence" rows="4"></textarea>
      <label for="description">Opis</label>
      <textarea class="input__transparent input__shadow" name="description" v-model="formData.desc" rows="4"></textarea>
      <label for="filename">Tagi:</label>
      <input-tag class="input__transparent input__shadow input__tags" v-model="formData.tags"></input-tag>
      <label for="filename">Nazwa pliku</label>
      <input class="input__transparent input__shadow" type="text" name="filename" v-model="formData.filename">
      <label for="timestamp">Data i czas</label>
      <v-date-picker class="input__shadow" name="timestamp" color="red" mode="dateTime" is-dark v-model="formData.selectedDate" is24hr :model-config="modelConfig" trim-weeks/>


      <button class="input__button" :class="{ bounce: errorButton }" type="button" name="button" @click="updateCanvas">
        <span class="text">
          Generuj
        </span>
      </button>

      <div class="errors" v-if="errors.length">
        <h2>Ziomuś uzupelnij pola!</h2>
        <ul class="errors__list">
          <li v-for="(error, id) in errors" :key="id">
            {{ error }}
          </li>
        </ul>
      </div>
      <!-- <a class="input__download" id="download" v-if="getGenerated" @click="downloadImage" >Pobierz</a> -->


    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Form",
  data() {
    return {
      formData: {
        sentence: null,
        desc: null,
        filename: null,
        tags: [],
        selectedDate: null
      },
      errorButton: false,
      errors: [],
      generated: false,
      modelConfig: {
        type: 'string',
        mask: 'DD.MM.YYYY HH:mm'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getGenerated'
    ])
  },
  methods: {
    checkForm(){
      if (this.formData.sentence && this.formData.desc && this.formData.filename && this.formData.tags.length > 0) {
        return true;
      }

      this.errors = [];

      if (!this.formData.sentence) {
        this.errors.push('Brakuje tresci mema!');
      }
      if (!this.formData.desc) {
        this.errors.push('Brakuje opisu!');
      }
      if (!this.formData.filename) {
        this.errors.push('Brakuje nazwy pliku!');
      }
      if (this.formData.tags.length <= 0) {
        this.errors.push('Halo halo, proszę podać tagi!');
      }

    },
    updateCanvas(){
      // var t = this;
      if (this.checkForm()) {
        this.errors = [];
        this.errorButton = false;
        this.$emit('clicked',this.formData);

        this.$db.collection("memes")
        .add({ img: this.formData.filename+".png", tags: this.formData.tags })
        .then(() => {
          console.log("DB updated!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      } else {
        this.errorButton = true;

      }


    },
    downloadImage(){
      this.$emit('download', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & label{
    padding: .5rem;
  }
  & input[type=text]{
    max-width: 320px;
    min-height: 30px;
  }
  & textarea{
    resize: vertical;
    width: 100%;
  }
  &__tags{
    width: 100%;
    border: 0;
  }
  &__transparent{
    background-color: transparent;
    color: #fff;
    padding: .5rem;
  }
  &__shadow{
    box-shadow: 0px 0px 21px 6px rgb(255 8 41 / 55%);
  }

  &__download{
    text-decoration: none;
    color: #f00;
    font-size: 32px;
    padding: 1rem 0;
    cursor: pointer;
  }
  &__button{
    padding: 1rem 3rem;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(255, 8, 41);
    border: none;
    border-radius: 50px;
    color: #fff;
    margin: 2rem 0;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover{
      background-color: #ff384f;
    }

    & .text{
      animation: color-change 2s infinite;
    }
  }
}
.bounce {
  outline: 0;
  border-color: red;
  animation-name: bounce;
  animation-duration: .5s;
  animation-delay: 0.25s;
}
@keyframes color-change {
  0% { color: red; }
  25% { color: pink; }
  50% { color: blue; }
  75% { color: aqua; }
  100% { color: green; }
}
.errors{
  background-color: red;
  padding: .5rem 4rem;
  &__list{
    text-align: left;
  }
}
@keyframes bounce {
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
}
</style>
