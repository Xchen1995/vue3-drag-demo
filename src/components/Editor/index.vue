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
    <!-- 右击菜单 -->
    <ContextMenu />
  </div>
</template>
<script>
import Grid from "./Grid.vue";
import { useStore } from "vuex";
import style from "./style.js";
import { computed, getCurrentInstance, reactive } from "@vue/runtime-core";
import { getStyle, getComponentRotatedStyle } from "@/utils/style";
import ContextMenu from "./ContextMenu.vue";

import Shape from "./Shape.vue";
export default {
  components: {
    Grid,
    Shape,
    ContextMenu,
  },
  setup() {
    const state = reactive({
      editorX: 0,
      editorY: 0,
      start: {
        // 选中区域的起点
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      isShowArea: false,
    });
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
    const handleMouseDown = () => {
      if (
        !curComponent.value ||
        (curComponent.value.component != "v-text" &&
          curComponent.value.component != "rect-shape")
      ) {
        e.preventDefault();
      }

      hideArea();

      // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
      const rectInfo = editor.value.getBoundingClientRect();
      state.editorX = rectInfo.x;
      state.editorY = rectInfo.y;

      const startX = e.clientX;
      const startY = e.clientY;
      state.start.x = startX - state.editorX;
      state.start.y = startY - state.editorY;
      // 展示选中区域
      state.isShowArea = true;

      const move = (moveEvent) => {
        state.width = Math.abs(moveEvent.clientX - startX);
        state.height = Math.abs(moveEvent.clientY - startY);
        if (moveEvent.clientX < startX) {
          state.start.x = moveEvent.clientX - state.editorX;
        }

        if (moveEvent.clientY < startY) {
          state.start.y = moveEvent.clientY - state.editorY;
        }
      };

      const up = (e) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        if (e.clientX == startX && e.clientY == startY) {
          hideArea();
          return;
        }

        createGroup();
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    const createGroup = () => {
      // 获取选中区域的组件数据
      const areaData = getSelectArea();
      if (areaData.length <= 1) {
        hideArea();
        return;
      }

      // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
      // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
      let top = Infinity,
        left = Infinity;
      let right = -Infinity,
        bottom = -Infinity;
      areaData.forEach((component) => {
        let style = {};
        if (component.component == "Group") {
          component.propValue.forEach((item) => {
            const rectInfo = $(`#component${item.id}`).getBoundingClientRect();
            style.left = rectInfo.left - this.editorX;
            style.top = rectInfo.top - this.editorY;
            style.right = rectInfo.right - this.editorX;
            style.bottom = rectInfo.bottom - this.editorY;

            if (style.left < left) left = style.left;
            if (style.top < top) top = style.top;
            if (style.right > right) right = style.right;
            if (style.bottom > bottom) bottom = style.bottom;
          });
        } else {
          style = getComponentRotatedStyle(component.style);
        }

        if (style.left < left) left = style.left;
        if (style.top < top) top = style.top;
        if (style.right > right) right = style.right;
        if (style.bottom > bottom) bottom = style.bottom;
      });

      state.start.x = left;
      state.start.y = top;
      state.width = right - left;
      state.height = bottom - top;

      // 设置选中区域位移大小信息和区域内的组件数据
      store.commit("setAreaData", {
        style: {
          left,
          top,
          width: state.width,
          height: state.height,
        },
        components: areaData,
      });
    };

    const hideArea = () => {
      state.isShowArea = 0;
      state.width = 0;
      state.height = 0;
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
      console.log(result);
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
