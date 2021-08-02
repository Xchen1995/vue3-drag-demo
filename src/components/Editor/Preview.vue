<template>
  <div class="bg" v-if="show">
    <el-button @click="close" class="close">关闭</el-button>
    <div class="canvas-container">
      <div class="canvas" :style="style">
        <ComponentWrapper
          v-for="(item, index) in componentData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import style from "./style.js";

import { getStyle } from "@/utils/style";
import { useStore } from "vuex";
import ComponentWrapper from "./ComponentWrapper.vue";
import { changeStyleWithScale } from "@/utils/translate";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: { ComponentWrapper },
  setup(props, { emit }) {

    const store = useStore();
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);

    const close = () => {
      emit("update:show", false);
    };
    
    return {
      style,
      changeStyleWithScale,
      componentData,
      canvasStyleData,
      getStyle,
      close
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>