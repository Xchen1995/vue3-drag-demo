import { createStore } from "vuex";
import contextmenu from "./modules/contextmenu.js";
import snapshot from './modules/snapshot.js';
export default createStore({
  modules: {
    contextmenu,
    snapshot
  },
  state: () => ({
    editMode: "edit", // 编辑器模式 edit preview
  }),
  mutations: {
    setEditMode(state, mode) {
      state.editMode = mode;
    },
  },
});
