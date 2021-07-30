import store from "../store";
import { ElMessage } from "element-plus";

const undo = function () {
  store.commit("snapshot/undo");
};

const redo = function () {
  store.commit("snapshot/redo");
};

const preview = function () {
  store.commit("setEditMode", "preview");
};

const save = function () {
  localStorage.setItem("canvasData", JSON.stringify(componentData));
  localStorage.setItem("canvasStyle", JSON.stringify(canvasStyleData));
  ElMessage.success('保存成功')
};

const buttonList = [
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
];

export default buttonList;
