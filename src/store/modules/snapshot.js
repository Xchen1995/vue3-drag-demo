import store from "../index";
import { deepCopy } from "@/utils/utils";

export default {
  namespaced: true,

  state: {
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引
  },
  mutations: {
    undo(state) {
      // 撤销
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        store.commit(
          "setComponentData",
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },
    redo(state) {
      // 重
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit(
          "setComponentData",
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },
  },
};
