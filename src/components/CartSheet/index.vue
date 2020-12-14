<template>
  <div class="text-center">
    <v-btn
      color="blue"
      dark
      @click="sheet = !sheet"
      class="open-cart-btn py-6 px-3"
    >
      Open Cart
      <v-chip
      outlined
      color="white"
      class="ma-1">
        {{cart.length}}
        <v-icon
          right
        >
          {{icons.mdiCart}}
        </v-icon>
      </v-chip>
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center py-6"
        max-height="400px"
      >
        <div v-if="cart.length > 0" style="max-width: 80%; margin: auto">
          <v-flex>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Price per unit (before VAT)</th>
                  <th class="text-left">VAT</th>
                  <th class="text-left">Total price</th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="item in cartView"
                  :key="item.name"
                >
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-left">{{ item.quantity }}</td>
                  <td class="text-left">{{ item.price }} €</td>
                  <td class="text-left">{{ item.VAT }} %</td>
                  <td class="text-left">{{ item.totalPrice }} €</td>
                </tr>
                <tr style="border-top: 5px solid black">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-left font-weight-bold">Total sum</td>
                  <td class="text-left font-weight-bold">{{ cartTotalPrice }} €</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-flex>
          <v-flex class="mt-3 d-flex justify-end align-center">
            <div style="flex-grow: 1" class="d-flex justify-start">
              <v-btn @click.stop="clearCart()"><v-icon left>{{ icons.mdiCancel }}</v-icon>Empty cart</v-btn>
            </div>
            <div class="d-flex flex-row align-center">
              <v-text-field
                label="Received amount"
                type="float"
                v-model="cash"
                class="me-5"
                :append-icon="icons.mdiCurrencyEur"
                @change.stop="snackbar = false"
              />
              <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" color="primary"><v-icon left>{{ icons.mdiCalculator }}</v-icon>Process</v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Return change
                  </v-card-title>
                  <v-card-text v-if="amountToReturn < 0"> Customer didn't give enough !</v-card-text>
                  <v-card-text v-else>
                    <div v-for="bill in availableBills" :key="bill" v-if="convertAmountToBillStack(amountToReturn)[bill] > 0">
                      Bill of <b>{{ bill }}</b> x {{ convertAmountToBillStack(amountToReturn)[bill] }}
                    </div>
                    <div><b>Coins:</b> {{ convertAmountToBillStack(amountToReturn)[0] }} €</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                    >
                      Done
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn @click.stop="validateCart()" color="success" class="ms-5"><v-icon left>{{ icons.mdiCheckAll }}</v-icon>Validate cart</v-btn>
            </div>
          </v-flex>
        </div>
        <p v-else>Your cart is empty :(</p>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script type="application/javascript">
import {mdiCart, mdiCancel, mdiCalculator, mdiCash, mdiCurrencyEur, mdiCheckAll} from '@mdi/js'

export default {
  name: 'CartSheet',
  data: () => ({
    icons: {mdiCart, mdiCancel, mdiCalculator, mdiCash, mdiCurrencyEur, mdiCheckAll},
    sheet: false,
    dialog: false,
    snackbar: false,
    cash: 0.0,
    availableBills: [
      500,
      100,
      50,
      20,
      10,
      5
    ]
  }),
  computed: {
    cart: function () { return this.$store.state.cart },
    cartView: function () {
      let cart = this.$store.state.cart
      let view = {}

      cart.forEach(item => {
        if (view[item.id] === undefined) {
          view[item.id] = {...item}
          view[item.id].quantity = 1
        } else {
          view[item.id].quantity++
        }
        let num = item.price * (1 + (item.VAT / 100.0)) * view[item.id].quantity
        view[item.id].totalPrice = (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
      })
      return view
    },
    cartTotalPrice: function () {
      let total = 0.0
      this.$store.state.cart.map(v => v.price).forEach(nb => { total += parseFloat(nb) })
      return total.toFixed(2)
    },
    amountToReturn: function () {
      let total = 0.0
      this.$store.state.cart.map(v => v.price).forEach(nb => { total += parseFloat(nb) })
      total = total.toFixed(2)
      return (this.cash - total).toFixed(2)
    }
  },
  methods: {
    clearCart: function () {
      this.$store.commit('clearCart')
    },
    showSnack: function () {
      this.snackbar = true
    },
    validateCart: function () {
      this.$store.commit('validateCart')
    },
    convertAmountToBillStack: function (amount) {
      const availableBills = [
        500,
        100,
        50,
        20,
        10,
        5
      ]
      let result = {}

      availableBills.forEach(bill => {
        let count = Math.trunc(amount / bill)

        amount -= count * bill
        result[bill] = count
      })
      result[0] = amount.toFixed(2)
      return result
    }
  }
}
</script>
<style scoped>
.open-cart-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 3em;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
