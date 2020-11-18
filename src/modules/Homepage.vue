<template>
  <v-flex class="d-flex flex-row flex-wrap justify-start align-start align-content-start wrapper">
    <MemberCard full-description="" full-name="Argann" brief="4th year EPITECH students actually studying abroad" pic-path="https://media-exp1.licdn.com/dms/image/C5603AQH9kJFm1-tJoQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=JqKIRixsM9jOQv6RiXkTRFlZSQmHKMCCSFCBbOajf5k"/>
    <MemberCard full-description="" full-name="Aurélien" brief="4th year EPITECH students actually studying abroad" pic-path="https://media-exp1.licdn.com/dms/image/C5603AQH9kJFm1-tJoQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=JqKIRixsM9jOQv6RiXkTRFlZSQmHKMCCSFCBbOajf5k"/>
    <MemberCard full-description="" full-name="Chris" brief="4th year EPITECH students actually studying abroad" pic-path="https://media-exp1.licdn.com/dms/image/C5603AQH9kJFm1-tJoQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=JqKIRixsM9jOQv6RiXkTRFlZSQmHKMCCSFCBbOajf5k"/>
    <MemberCard full-description="" full-name="Hugo" brief="4th year EPITECH students actually studying abroad" pic-path="https://media-exp1.licdn.com/dms/image/C5603AQH9kJFm1-tJoQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=JqKIRixsM9jOQv6RiXkTRFlZSQmHKMCCSFCBbOajf5k"/>
    <MemberCard full-description="" full-name="Thibaut" brief="4th year EPITECH students actually studying abroad" pic-path="https://media-exp1.licdn.com/dms/image/C5603AQH9kJFm1-tJoQ/profile-displayphoto-shrink_200_200/0?e=1609977600&v=beta&t=JqKIRixsM9jOQv6RiXkTRFlZSQmHKMCCSFCBbOajf5k"/>
  </v-flex>
</template>
<script>
import MemberCard from '../components/MemberCard'
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
