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
    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :key="item.id"
      :active="item === curComponent"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        v-if="item.component != 'v-text'"
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="'component' + item.id"
      />

      <component
        v-else
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        @input="handleInput"
        :element="item"
        :id="'component' + item.id"
      />
    </Shape>
  </div>
</template>
<script>
import Grid from "./Grid.vue";
import { useStore } from "vuex";
import style from "./style.js";
import { computed, getCurrentInstance } from "@vue/runtime-core";
import { getStyle, getComponentRotatedStyle } from "@/utils/style";

import Shape from "./Shape.vue";
export default {
  components: {
    Grid,
    Shape,
  },
  setup() {
    const store = useStore();

    const componentData = computed(() => store.state.componentData);
    const curComponent = computed(() => store.state.curComponent);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const editor = computed(() => store.state.editor);

    const handleContextMenu = (e) => {
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
    const getShapeStyle = (style) => {
      const result = {};
      ["width", "height", "top", "left", "rotate"].forEach((attr) => {
        if (attr != "rotate") {
          result[attr] = style[attr] + "px";
        } else {
          result.transform = "rotate(" + style[attr] + "deg)";
        }
      });

      return result;
    };
    const getComponentStyle = (style) => {
      return getStyle(style, ["top", "left", "width", "height", "rotate"]);
    };
    return {
      style,
      curComponent,
      canvasStyleData,
      editor,
      handleContextMenu,
      componentData,
      getShapeStyle,
      getComponentStyle,
    };
  },
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
