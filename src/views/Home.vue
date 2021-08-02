<!--
 * @Author: your name
 * @Date: 2021-07-30 22:08:32
 * @LastEditTime: 2021-07-30 22:32:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/views/Home.vue
-->
<template>
  <div class="home">
    <Toolbar />
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <section class="right"></section>
    </main>
  </div>
</template>
<script setup>
import Toolbar from "@/components/Toolbar.vue";
import componentList from "@/custom-component/component-list"; // 左侧列表数据
import generateID from "@/utils/generateID";

import ComponentList from "@/components/ComponentList.vue"; // 左侧列表组件
import Editor from "@/components/Editor/index.vue";
import { useStore } from "vuex";
import { deepCopy } from "@/utils/utils";

const store = useStore();

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const index = e.dataTransfer.getData("index");
  if (index) {
    const component = deepCopy(componentList[index]);
    component.style.top = e.offsetY;
    component.style.left = e.offsetX;
    component.id = generateID();
    store.commit("addComponent", { component });
    store.commit("snapshot/recordSnapshot");
  }
};
const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
};
const handleMouseDown = () => {
  store.commit("setClickComponentStatus", false);
};
const deselectCurComponent = () => {
  console.log(44);
};
</script>


<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>