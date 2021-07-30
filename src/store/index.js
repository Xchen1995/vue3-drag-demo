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
export default createStore({
  modules: {
    contextmenu,
    snapshot,
  },
  state: () => ({
    componentData: [],
    canvasStyleData: {
      // 页面全局数据
      width: 1200,
      height: 740,
      scale: 100,
    },
    editMode: "edit", // 编辑器模式 edit preview
  }),
  mutations: {
    setCanvasStyle(state, style) {
      state.canvasStyleData = style;
    },
    setEditMode(state, mode) {
      state.editMode = mode;
    },
    setComponentData(state, componentData = []) {
      state.componentData = componentData;
    },
  },
});
