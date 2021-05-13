<template lang="html">
  <div v-bind:style="{ height: '50vh', width: '100%' }" ref="container">
    <v-stage class="generator"
    :config="configKonva"
    ref="stage"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
    >
      <v-layer ref="layer">
        <v-image
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @transformend="handleTransformEnd"
        :config="configImage"/>

        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import Konva from 'konva';
const width = window.innerWidth;
const height = window.innerHeight;
const image = new window.Image();

export default {
  name: 'makeameme',
  data() {
    return {
      list: [],
      image: null,
      configKonva: {
        width: width,
        height: height
      },
      configImage: {
        image: image,
        draggable: true,
        name: 'kulfon'
      },
      isDragging: false,
      selectedShapeName: '',
      // imageConfig: {
      //   image: image
      // }
    };
  },
  created: function() {
    window.addEventListener("load", this.changeRect);
    window.addEventListener("resize", this.changeRect);

    image.src = require("/src/assets/generator/kulfon-broda.png");
    this.image = image

    this.changeRect();
  },
  methods: {
    changeRect: function() {
     const container = this.$refs.container;

     if (!container) {
       return;
     }

     const height = container.offsetHeight;
     const width = container.offsetWidth;

     console.log(height, height);
     this.configKonva.width = width;
     this.configKonva.height = height;
   },
   handleDragStart() {
     this.isDragging = true;
   },
   handleDragEnd() {
     this.isDragging = false;
   },
   handleTransformEnd(e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state
      // const rect = this.rectangles.find(
      //   (r) => r.name === this.selectedShapeName
      // );
      const rect = this.configImage;
      // update the state
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // change fill
      rect.fill = Konva.Util.getRandomColor();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const name = e.target.name();
      // const rect = this.rectangles.find((r) => r.name === name);
      const rect = this.configImage;
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
      } else {
        // remove transformer
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    },
 },
  mounted(){
    for (let n = 0; n < 30; n++) {
      this.list.push({
        id: Math.round(Math.random() * 10000).toString(),
        x: Math.random() * width,
        y: Math.random() * height,
        rotation: Math.random() * 180,
        scale: Math.random()
      });
    }
  }
}
</script>

<style lang="css" scoped>
.generator{
  width: 100%;
  background-color: #fff;
}
</style>
