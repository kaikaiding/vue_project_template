import Vue from "vue";
import Vuex from "vuex";
import promise from "es6-promise";
promise.polyfill();

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
});
