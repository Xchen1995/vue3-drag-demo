import { createStore } from "vuex";
import contextmenu from "./modules/contextmenu.js";

export default createStore({
  modules: {
    contextmenu,
  },
});
