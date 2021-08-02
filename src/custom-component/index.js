/*
 * @Author: your name
 * @Date: 2021-08-02 22:20:09
 * @LastEditTime: 2021-08-02 22:58:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/custom-component/index.js
 */
import { defineAsyncComponent } from "vue";
const components = ["Picture", "VText", "VButton", "Group", "RectShape"];
export default function register(app) {
  components.forEach((key) => {
      const AsyncComp = defineAsyncComponent(() =>
      import( /* @vite-ignore */ `@/custom-component/${key}.vue`)
    );
    app.component(key, AsyncComp);
  });
}


