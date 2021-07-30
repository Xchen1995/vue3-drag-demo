import store from "../index";
import { deepCopy } from "@/utils/utils";
export default {
  namespaced: true,

  state: {
    snapshotData: [], // 编辑器操作快照数据
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
      // 重做
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit(
          "setComponentData",
          deepCopy(state.snapshotData[state.snapshotIndex])
        );
      }
    },
    recordSnapshot(state) {
      state.snapshotData[++state.snapshotIndex] = deepCopy(store.state.componentData)
      if (state.snapshotIndex < state.snapshotData.length - 1) {
          state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
      }
  }
  },
};
