/*
 * @Author: Xchen1995
 * @Date: 2021-07-30 22:08:32
 * @LastEditTime: 2021-07-30 23:32:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/store/index.js
 */

import { createStore } from "vuex";
import contextmenu from "./modules/contextmenu.js";
import snapshot from "./modules/snapshot.js";
import compose from './modules/compose.js';
import copy from './modules/copy.js';

export default createStore({
  modules: {
    contextmenu,
    snapshot,
    compose,
    copy
  },
  state: () => ({
    componentData: [],
    canvasStyleData: {
      // 页面全局数据
      width: 1200,
      height: 740,
      scale: 100,
    },
    curComponent: null,
    curComponentIndex: null,
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    editMode: "edit", // 编辑器模式 edit preview
  }),
  mutations: {
    lock({ curComponent }) {
      curComponent.isLock = true;
    },
    unlock({ curComponent }) {
      curComponent.isLock = false;
    },
    setClickComponentStatus(state, status) {
      state.isClickComponent = status;
    },
    setCurComponent(state, { component, index }) {
      console.log(component);
      state.curComponent = component;
      state.curComponentIndex = index;
    },
    setCanvasStyle(state, style) {
      state.canvasStyleData = style;
    },
    setEditMode(state, mode) {
      state.editMode = mode;
    },
    setShapeSingleStyle({ curComponent }, { key, value }) {
      curComponent.style[key] = value;
    },
    setComponentData(state, componentData = []) {
      state.componentData = componentData;
    },
    addComponent(state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component);
      } else {
        state.componentData.push(component);
      }
    },
    deleteComponent() {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }

      state.componentData.splice(index, 1);
    },
    setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
      if (rotate) curComponent.style.rotate = rotate;
    },
  },
});
