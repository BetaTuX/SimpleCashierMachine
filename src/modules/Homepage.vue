<template>
  <v-flex class="d-flex flex-row flex-wrap justify-start align-start align-content-start wrapper pt-3">
    <MemberCard v-for="dev in $globalData.devs" :key="dev.fullName" :full-name="dev.fullName" :full-description="dev.fullDescription" :brief="dev.brief" :pic-path="dev.picPath"/>
  </v-flex>
</template>
<script>
import MemberCard from '../components/MemberCard/MemberCard'
export default {
  name: 'Homepage',
  components: {MemberCard},
  data: () => ({})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper > * {
    margin-bottom: 1em;
    margin-right: 1em;
  }
  .wrapper > *:last-child {
    margin-right: 0;
  }
</style>
