<template lang="html">
  <div class="">
    <div class="meme">
      <canvas id="canvas" class="meme__canvas" ref="canvas" width="1024" height="768"></canvas>
    </div>
  </div>
</template>

<script>
import jaroBg from "../assets/jaro-bg.png";
export default {
  name: 'GenerateCanvas',
  props: {
    memeData: Object,
    getMeme: Boolean
  },
  data(){
    return {
      vueCanvas: null,
      image: null,
      generated: false,
      maxWidth: 500,
      lineHeight: 50,

    }
  },
  methods: {
    draw() {
      var t = this;
      this.image.onload = function() {
        t.vueCanvas.drawImage(t.image, 0, 0);
      }
    },
    updateCanvas(){

      this.vueCanvas.clearRect(0, 0, 1024, 768);
      this.vueCanvas.drawImage(this.image, 0, 0);
      this.vueCanvas.font = "50px Ink Free";
      this.vueCanvas.fillStyle = "#fff";
      this.wrapText(this.vueCanvas, this.memeData.sentence, 80, 150, this.maxWidth, this.lineHeight);
      // this.vueCanvas.fillText(this.sentence, 100, 150, 500);
      this.vueCanvas.font = "20px Ink Free";
      this.vueCanvas.fillText("~Jaro "+this.memeData.desc, 80, 350);
      if (this.memeData.selectedDate != null) {
        this.vueCanvas.fillText(this.memeData.selectedDate, 80, 400);
      }

      // this.generated = true;
      this.$store.dispatch('generateInfo', true);
      this.downloadImage();
    },
    downloadImage(){
      var t = this;

      var canvas = document.getElementById('canvas');
      var tmp = canvas.toDataURL();
      // var canvas = document.getElementById('canvas');
      // var link = document.getElementById('download');
      // link.href = canvas.toDataURL();
      // if (this.memeData.filename != "") {
      //   link.download = this.memeData.filename+".png";
      // } else {
      //   link.download = "jaro.png";
      // }
      //wysylka mema na serwer

      this.$axios.post('http://localhost:2000', JSON.stringify({
        name: t.memeData.filename,
        img: tmp,
        // tags: t.memeData.tags
      }))
      .then(function(res){
        console.log(res);
        console.log(res.data);
        t.$store.dispatch('showPopup', {
          show: true,
          success: true,
          msg: res.data.msg
        });
        setTimeout(function(){
          t.$store.dispatch('showPopup',{
            show: false,
          });
        }, 3000);
      }).catch(function(err){
        console.log(err);
        console.log(err.data);
        t.$store.dispatch('showPopup', {
          show: true,
          success: false,
          msg: err.data.msg
        });
        setTimeout(function(){
          t.$store.dispatch('showPopup',{
            show: false,
          });
        }, 3000);
      })

    },
    wrapText: function wrapText(context, text, x, y, maxWidth, lineHeight) {
       var words = text.split(' ');
       var line = '';

       for(var n = 0; n < words.length; n++) {
         var testLine = line + words[n] + ' ';
         var metrics = this.vueCanvas.measureText(testLine);
         var testWidth = metrics.width;
         if (testWidth > maxWidth && n > 0) {
           this.vueCanvas.fillText(line, x, y);
           line = words[n] + ' ';
           y += lineHeight;
         }
         else {
           line = testLine;
         }

       }
       this.vueCanvas.fillText(line, x, y);
     }

  },
  watch: {
    memeData: {
      handler: function handler(){
        this.updateCanvas();
      }
    },
    getMeme: {
      handler: function handler(){
        this.downloadImage();
      }
    }
  },
  mounted(){
    let cvn = this.$refs.canvas;
    this.vueCanvas = cvn.getContext("2d");
    let bg = new Image();
    this.image = bg;
    this.image.src = jaroBg;

    this.draw();
  }


}
</script>

<style lang="scss" scoped>

.meme{
  @media(max-width: 960px){
    margin-top: 50px;
  }
  &__canvas{
    max-width: 100%;
    -webkit-box-shadow: 0px 0px 21px 6px rgba(255,8,41,0.55);
    -moz-box-shadow: 0px 0px 21px 6px rgba(255,8,41,0.55);
    box-shadow: 0px 0px 21px 6px rgba(255,8,41,0.55);
  }
}

</style>
