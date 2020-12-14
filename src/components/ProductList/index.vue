<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th>Name</th>
        <th>
          <v-select
            :items="availableTypes"
            v-model="filterType"
            attach=""
            chips
            multiple
            solo flat
            :append-icon="icons.mdiChevronDown"
            single-line
            small-chips
            dense
            label="Type"
            :menu-props="{ bottom: true, offsetY: true, closeOnClick: true }"
            class="type-select"
          />
        </th>
        <th>Price per unit</th>
        <th>Quantity</th>
        <th>Expiration Date</th>
        <th><slot name="action-fab"/></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.name }}</td>
        <td>
          <v-chip>{{ item.type }}</v-chip>
        </td>
        <td>{{ (item.price * item.VAT).toFixed(2) }} €</td>
        <td class="d-flex flex-row justify-end align-center">
          {{ item.quantity }}
          <ModifyProductForm :product-id="item.id"/>
        </td>
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
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {mdiCart, mdiFormDropdown, mdiChevronDown} from '@mdi/js'
import ModifyProductForm from '../ModifyProductForm/index'
import consts from '../../consts'

export default {
  name: 'ProductList',
  components: {ModifyProductForm},
  data: () => ({
    icons: {mdiCart, mdiFormDropdown, mdiChevronDown},
    availableTypes: consts.itemTypes,
    filterType: []
  }),
  computed: {
    products: function () {
      let list = this.$store.state.products
      if (this.filterType.length !== 0) { list = list.filter(value => this.filterType.includes(value.type)) }
      list = list.filter(value => new Date(value.expirationDate) >= new Date()).sort((act, next) => (act.type < next.type) ? -1 : 1)
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
        this.$store.state.cart.push(list[0])
        this.$store.commit('saveCart')
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
