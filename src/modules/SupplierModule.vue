<template>
  <SupplierList class="fill-height">
    <template v-slot:action-fab>
      <SupplierForm/>
    </template>
  </SupplierList>
</template>

<script>
import SupplierForm from '../components/SupplierForm/index'
import SupplierList from '../components/SupplierList/index'

export default {
  name: 'SupplierModule',
  components: {SupplierForm, SupplierList}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
