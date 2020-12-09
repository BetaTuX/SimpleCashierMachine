<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th v-for="item in headers" :key="item">{{ item }}</th>
      </tr>
      <slot name="action-fab"/>
      </thead>
      <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.expirationDate }}</td>
        <td class="action-cell">
          <v-btn
            color="success"
            @click.stop="buy(item.id)"
          >
            Buy
            <v-icon right>
              {{ icons.mdiCart }}
            </v-icon>
          </v-btn>
          <ModifyProductForm :product-id="item.id"/>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mdiCart} from '@mdi/js'
import ModifyProductForm from '../ModifyProductForm/index'

export default {
  name: 'ProductList',
  components: {ModifyProductForm},
  data: () => ({
    icons: {mdiCart},
    headers: [
      'Name',
      'Quantity',
      'Expiration Date'
    ]
  }),
  computed: {
    products: function () {
      console.log(this.$store)
      let list = this.$store.state.products
      list = list.filter(value => new Date(value.expirationDate) >= new Date())
      return list
    }
  },
  methods: {
    test: function () {
      console.log(this)
    },
    buy: function (productId) {
      let list = this.$store.state.products.filter(value => value.id === productId)
      list = list.filter(value => new Date(value.expirationDate) >= new Date())
      if (list.length !== 1 || list[0].quantity <= 0) {
        // TODO: display error
      } else {
        this.$store.commit('buyProduct', productId)
      }
    }
  }
}
</script>

<style scoped>
  .action-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
