import "vuetify/dist/vuetify.min.css";

import Vue from "vue"
import App from "./app.vue"
import store from './store/store.js'

import router from './router'

import Vuetify from "vuetify/lib"
import colors from 'vuetify/lib/util/colors'

import promise from 'es6-promise'
promise.polyfill();

import '@babel/polyfill'

Vue.use(Vuetify)

Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    }
})

Vue.directive('visible', {
    bind: function (el, binding) {
        el.style.opacity = binding.value ? 1 : 0;
    },
    update: function (el, binding) {
        el.style.opacity = binding.value ? 1 : 0;
    }
  });


const opts = {
    theme: {
      dark: false,
      themes: {
        light: {
            main_color: colors.blue.darken2, 
            main_color_alt: colors.yellow.darken2,
            secondary_color: colors.lightBlue.lighten1, 
            assist_color: colors.lightBlue.lighten5,
            assist_color_alt: colors.orange.lighten5,
            accent_color: colors.indigo.base, // #3F51B5
            accent_color_alt: colors.pink.lighten1,
            confirm_color: colors.green.lighten1,
            reject_color: colors.red.darken2, 
            color_light: colors.grey.lighten5,
            color_dark: colors.blueGrey.darken4,
            color_disabled: colors.grey.darken1
          }
      }
    }
  } 

  new Vue({
      vuetify: new Vuetify(opts),
      el: '#app',
      store,
      components:{ 'App':App},
      router,
      created() {
          //this.checkLogin(); //有登入功能才需要
          // this.$store.dispatch('set_username', 'test');
        },
        methods: {
        
        }    
  })


