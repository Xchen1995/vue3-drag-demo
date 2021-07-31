<!--
 * @Author: your name
 * @Date: 2021-07-30 22:23:03
 * @LastEditTime: 2021-07-31 08:49:26
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
import { useStore } from "vuex";
import style from './style.js';

export default {
  components: {
    Grid
  },
  setup() {
    const store = useStore();
    
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
      style
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
