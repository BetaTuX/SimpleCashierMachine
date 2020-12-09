<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          class="mx-2"
          v-bind="attrs"
          v-on="on"
          @click.end="quantity = item().quantity"
        >
          Modify
          <v-icon>
            {{ icons.mdiPen }}
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Modify '{{ item().name }}'</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  type="number"
                  label="Quantity*"
                  v-model="quantity"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            text
            @click="close()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            outlined
            @click="save()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mdiPlus, mdiPencil as mdiPen} from '@mdi/js'
import './style.css'

export default {
  name: 'ModifyProductForm',
  props: {
    productId: 0
  },
  data: () => {
    return {
      icons: {mdiPlus, mdiPen},
      dialog: false,
      quantity: 0
    }
  },
  methods: {
    item: function () {
      return this.$store.state.products.filter(value => value.id === this.productId)[0]
    },
    save: function () {
      this.$store.commit('updateProduct', {id: this.productId, quantity: this.quantity})
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
