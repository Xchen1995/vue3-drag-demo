/*
 * @Author: your name
 * @Date: 2021-07-30 23:24:29
 * @LastEditTime: 2021-07-31 08:37:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/utils/translate.js
 */
import store from "@/store";
export function changeStyleWithScale(value) {
  return (value * parseInt(store.state.canvasStyleData.scale)) / 100;
}

function angleToRadian(angle) {
  return (angle * Math.PI) / 180;
}

export function sin(rotate) {
  return Math.abs(Math.sin(angleToRadian(rotate)));
}

export function cos(rotate) {
  return Math.abs(Math.cos(angleToRadian(rotate)));
}
