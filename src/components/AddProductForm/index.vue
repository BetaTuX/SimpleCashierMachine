<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark role="img" aria-hidden="false">
            {{ icons.mdiPlus }}
          </v-icon>
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
                ></v-text-field>
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
            text
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mdiPlus} from '@mdi/js'
import './style.css'

export default {
  name: 'AddProductForm',
  data: () => {
    return {
      icons: {mdiPlus},
      dialog: false,
      expirationDatePicker: false,
      name: '',
      quantity: 0,
      expirationDate: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    save: function () {
      this.$store.commit('insertProduct', {name: this.name, quantity: this.quantity, expirationDate: this.expirationDate})
      this.dialog = false
      this.expirationDatePicker = false
      this.name = ''
      this.quantity = 0
      this.expirationDate = new Date().toISOString().substr(0, 10)
    },
    close: function () {
      this.dialog = false
      this.expirationDatePicker = false
      this.name = ''
      this.quantity = 0
      this.expirationDate = new Date().toISOString().substr(0, 10)
    }
  }
}
</script>
