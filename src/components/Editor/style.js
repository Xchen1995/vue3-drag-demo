/*
 * @Author: your name
 * @Date: 2021-07-31 08:43:13
 * @LastEditTime: 2021-07-31 08:49:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/components/Editor/style.js
 */
import { changeStyleWithScale } from "@/utils/translate.js";
import { computed } from "vue";
import store from "@/store";

const style = computed(() => {
  return {
    width: changeStyleWithScale(store.state.canvasStyleData.width) + "px",
    height: changeStyleWithScale(store.state.canvasStyleData.height) + "px"
  };
});

export default style;