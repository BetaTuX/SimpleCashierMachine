<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          class="mx-2"
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left dark role="img" aria-hidden="false">
            {{ icons.mdiPlus }}
          </v-icon>
          Add new Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Product name*"
                  v-model="name"
                  required
                  :rules="[requiredFieldRule(name)]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  type="number"
                  label="Quantity*"
                  v-model="quantity"
                  required
                  :rules="[requiredFieldRule(quantity), function () { return quantity >= 0 ? true: 'Quantity should be greater or equal 0' }]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  type="float"
                  label="Product price*"
                  v-model="price"
                  required
                  :rules="[requiredFieldRule(price), function () { return price > 0 ? true: 'Price should be greater than 0' }]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-select
                  :menu-props="{ bottom: true, offsetY: true, closeOnClick: true }"
                  :append-icon="icons.mdiChevronDown"
                  :items="availableVAT"
                  label="VAT*"
                  v-model="VAT"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-select
                  :menu-props="{ bottom: true, offsetY: true, closeOnClick: true }"
                  :append-icon="icons.mdiChevronDown"
                  :items="availableTypes"
                  label="Standard"
                  v-model="type"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
              >
                <v-menu
                  v-model="expirationDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="expirationDate"
                      label="Expiration date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="expirationDate"
                    @input="expirationDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            style="color: white"
            @click.stop="save()"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mdiPlus, mdiChevronDown} from '@mdi/js'
import './style.css'
import consts from '../../consts'

export default {
  name: 'AddProductForm',
  data: () => {
    return {
      icons: {mdiPlus, mdiChevronDown},
      dialog: false,
      expirationDatePicker: false,
      name: '',
      quantity: 0,
      expirationDate: new Date().toISOString().substr(0, 10),
      availableTypes: consts.itemTypes,
      availableVAT: consts.VAT,
      type: '',
      price: 0,
      VAT: 0
    }
  },
  methods: {
    save: function () {
      if (this.validateForm() === false) {
        return
      }
      this.$store.commit('insertProduct', {
        name: this.name,
        type: this.type,
        quantity: this.quantity,
        price: this.price,
        VAT: this.VAT,
        expirationDate: this.expirationDate
      })
      this.dialog = false
      this.expirationDatePicker = false
      this.name = ''
      this.type = ''
      this.quantity = 0
      this.price = 0
      this.VAT = 0
      this.expirationDate = new Date().toISOString().substr(0, 10)
    },
    close: function () {
      this.dialog = false
      this.expirationDatePicker = false
      this.name = ''
      this.type = ''
      this.quantity = 0
      this.price = 0
      this.VAT = 0
      this.expirationDate = new Date().toISOString().substr(0, 10)
    },
    requiredFieldRule: function (inp) {
      return function () {
        return (inp.length > 0) ? true : 'You should fill this field'
      }
    },
    validateForm: function () {
      const fields = [this.quantity, this.expirationDate, this.name, this.type]

      fields.forEach(v => {
        if (v.length <= 0) {
          return false
        }
      })
      return this.quantity > 0
    }
  }
}
</script>
