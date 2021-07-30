import store from "../store";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const undo = function () {
  store.commit("snapshot/undo");
};

const redo = function () {
  store.commit("snapshot/redo");
};

const isShowPreview = ref(false);

const preview = function () {
  isShowPreview.value = true;
  store.commit("setEditMode", "preview");
};

const save = function () {
  localStorage.setItem("canvasData", JSON.stringify(componentData));
  localStorage.setItem("canvasStyle", JSON.stringify(canvasStyleData));
  ElMessage.success("保存成功");
};

const clearCanvas = function () {
  store.commit("setComponentData", []);
  store.commit("snapshot/recordSnapshot");
};

const compose = function () {
  store.commit("snapshot/recordSnapshot");
};
const buttonList = ref([
  {
    name: "撤销",
    method: undo,
  },
  {
    name: "重做",
    method: redo,
  },
  { name: "预览", method: preview },
  { name: "保存", method: save },
  { name: "组合", method: clearCanvas, disabled: true },
  { name: "拆分", method: clearCanvas },
  { name: "锁定", method: clearCanvas },
  { name: "解锁", method: clearCanvas },
]);

export { buttonList, isShowPreview, preview };
