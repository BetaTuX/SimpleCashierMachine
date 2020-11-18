<template>
  <v-card
    class="mx-auto"
    max-width="250px"
  >
    <v-img
      class="align-end"
      :class="blackName ? '' : 'white--text'"
      height="250px"
      :src="picPath"
    >
      <v-card-title class="biseau"><span>{{ fullName }}</span></v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div class="text-start">{{ brief }}</div>
    </v-card-text>

    <v-card-actions
      v-if="fullDescription">
      <v-btn
        color="orange"
        text
        @click="reveal = true"
      >
        Learn more
      </v-btn>
    </v-card-actions>
    <v-expand-transition
    v-if="fullDescription">
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal flex d-flex flex-column"
        style="height: 100%;"
      >
        <v-card-text class="pb-0 text-start flex-grow-1">
          <p class="title text--primary">
            About me
          </p>
          <p>{{ fullDescription }}</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="orange accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'MemberCard',
  data: () => ({
    reveal: false
  }),
  props: {
    fullName: {type: String, required: true},
    brief: {type: String, required: true},
    fullDescription: {type: String, required: false},
    picPath: {type: String, required: false},
    blackName: {type: Boolean, required: false, default: false}
  }
}
</script>

<style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }

  .biseau {
    height: 40px;
    background: orange;
    display: inline-block;
    padding: 0;
    margin-bottom: .3em;
    position: relative;
  }
  .biseau::before {
    content:"";
    position:absolute;
    left:-20px;
    width:0;
    height:0;
    border-style:solid;
    border-color:transparent transparent orange transparent;
    border-width:0px 0px 40px 20px;
  }
  .biseau::after {
    content:"";
    position:absolute;
    right:-20px;
    width:0;
    height:0;
    border-style:solid;
    border-color:orange transparent transparent  transparent;
    border-width:40px 20px 0px 0px;
  }
</style>
