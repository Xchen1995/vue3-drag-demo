/*
 * @Author: your name
 * @Date: 2021-08-02 22:20:09
 * @LastEditTime: 2021-08-02 22:59:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-drag-demo/src/main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import register from './custom-component/index.js';
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/reset.css";
import "@/styles/animate.css";

import Picture from '@/custom-component/Picture.vue';
import VText from '@/custom-component/VText.vue';
import VButton from '@/custom-component/VButton.vue';
import Group from '@/custom-component/Group.vue';
import RectShape from '@/custom-component/RectShape.vue';

const app = createApp(App);
app.component('Picture', Picture);
app.component('VText', VText);
app.component('VButton', VButton);
app.component('Group', Group);
app.component('RectShape', RectShape);

app.use(ElementPlus, { size: "small" });
app.use(router);
app.use(store);
app.mount("#app");
