import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customers: JSON.parse(localStorage.getItem('customers')) || [],
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    suppliers: JSON.parse(localStorage.getItem('suppliers')) || [],
    products: JSON.parse(localStorage.getItem('products')) || []
  },
  mutations: {
    insertSupplier: function (state, name) {
      const last = state.suppliers[state.suppliers.length - 1]
      state.suppliers.push({
        id: (last) ? last.id + 1 : 0,
        name
      })
      localStorage.setItem('suppliers', state.suppliers)
    },
    insertProduct: function (state, payload) {
      const last = state.products[state.products.length - 1]

      state.products.push({
        id: (last) ? last.id + 1 : 0,
        name: payload.name,
        quantity: payload.quantity,
        expirationDate: payload.expirationDate
      })
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    buyProduct: function (state, payload) {
      state.products.filter(value => value.id === payload)[0].quantity--
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    updateProduct: function (state, payload) {
      if (payload.hasOwnProperty('id') && payload.hasOwnProperty('quantity')) {
        state.products.filter(value => value.id === payload.id)[0].quantity = payload.quantity
        localStorage.setItem('products', JSON.stringify(state.products))
      }
    }
  },
  getters: {},
  actions: {},
  modules: {}
})
