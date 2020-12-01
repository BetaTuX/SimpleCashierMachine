// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App'
import router from './router'
import shared from './shared'

Vue.config.productionTip = false

shared.install = function () {
  Object.defineProperty(Vue.prototype, '$globalData', {
    get () { return shared }
  })
}

Vue.use(shared)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  components: { App },
  template: '<App/>'
})
