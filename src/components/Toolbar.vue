<template>
  <div class="toolbar">
    <el-button
      v-for="item in buttonList"
      :key="item.id"
      @click="item.method"
      :disabled="item.disabled"
    >
      {{ item.name }}
    </el-button>

    <div class="canvas-config">
      <span>画布大小</span>
      <!-- <input v-model="canvasStyleData.width" /> -->
      <span>*</span>
      <!-- <input v-model="canvasStyleData.height" /> -->
    </div>
    <div class="canvas-config">
      <span>画布比例</span>
      <!-- <input v-model="scale" @input="handleScaleChange" /> % -->
    </div>
    <Preview v-model:show="isShowPreview" @change="handlePreviewChange" />

  </div>
</template>

<script>

import {
  buttonList,
  isShowPreview,
  preview,
  handlePreviewChange,
} from "@/custom-component/toolbar-btn-list.js";
import Preview from '@/components/Editor/Preview.vue';

export default {
  components:{
    Preview
  },
  setup() {
    return {
      buttonList,
      isShowPreview,
      preview,
      handlePreviewChange
    };
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  height: 64px;
  line-height: 64px;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .canvas-config {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 10px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }

  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>