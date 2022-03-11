import { createStore } from "vuex";
import { useCookies } from "vue3-cookies";
import products from "./products.js";
import factors from "./factors.js";

import axios from "axios";

export default createStore({
  state: {
    apiURL: "https://api-dev.pozitronet.ir",
    cookies: useCookies(),
    userToken: "",
    userDomain: "",
  },
  mutations: {
    changeUserToken(state, data = null) {
      if (data == "") {
        state.userToken = "";
      } else {
        state.userToken = state.cookies.cookies.get("uToken");
      }
      // products.mutations.setUserTokenForProducts();
    },
  },
  actions: {},
  modules: {
    products: products,
    factors: factors,
  },
});
