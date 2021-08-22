<!--
 * @Author: your name
 * @Date: 2021-08-02 22:20:09
 * @LastEditTime: 2021-08-22 21:56:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/custom-component/ReatShape.vue
-->
<template>
  <div class="rect-shape">
    <!-- <v-text :propValue="element.propValue" :element="element" /> -->
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: String,
      require: true,
    },
    element: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.color {
  
}
</style>
