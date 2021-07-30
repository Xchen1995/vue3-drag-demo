<!--
 * @Author: your name
 * @Date: 2021-07-30 22:23:03
 * @LastEditTime: 2021-07-30 23:50:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/components/Editor/Index.vue
-->

<template>
  <div
    class="editor"
    id="editor"
    :style="style"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <!-- 网格线 -->
    <Grid />
  </div>
</template>
<script>
import Grid from "./Grid.vue";
import { changeStyleWithScale } from "@/utils/translate.js";

import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    Grid
  },
  setup() {
    const store = useStore();

    let style = computed(() => {
      return {
        width: changeStyleWithScale(store.state.canvasStyleData.width) + "px",
        height: changeStyleWithScale(store.state.canvasStyleData.height) + "px"
      };
    });
    let handleContextMenu = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY;
      let left = e.offsetX;
      while (target instanceof SVGElement) {
        target = target.parentNode;
      }

      while (!target.className.includes("editor")) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }

      store.commit("contextmenu/showContextMenu", { top, left });
    };
    return {
      style,
      changeStyleWithScale
    };
  }
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: 0.5;
  }
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
