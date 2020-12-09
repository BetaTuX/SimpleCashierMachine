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
      <tr v-for="item in suppliers" :key="item.name">
        <td>{{ item.name }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'SupplierList',
  data: () => ({
    headers: [
      'Name'
    ]
  }),
  computed: {
    suppliers: function () {
      console.log(this.$store)
      return this.$store.state.suppliers
    }
  },
  methods: {
    test: function () {
      console.log(this)
    }
  }
}
</script>

<style scoped>
</style>
