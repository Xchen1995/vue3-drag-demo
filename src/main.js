import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/custom-component'; // 注册自定义组件

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/reset.css";
import "@/styles/animate.css";

const app = createApp(App);

app.use(ElementPlus, { size: "small" });
app.use(router);
app.use(store);
app.mount("#app");
