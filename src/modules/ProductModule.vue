<template>
  <ProductList class="fill-height">
    <template v-slot:action-fab>
      <AddProductForm/>
    </template>
  </ProductList>
</template>

<script>
import AddProductForm from '../components/AddProductForm'
import ProductList from '../components/ProductList'

export default {
  name: 'ProductModule',
  components: {AddProductForm, ProductList}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
