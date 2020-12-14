<template>
  <v-card
    class="mx-auto"
    max-width="18%"
  >
    <v-img
      class="align-end"
      :class="blackName ? '' : 'white--text'"
      aspect-ratio="1"
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
        color="#2196f3"
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
            color="#2196f3 accent-4"
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
import './style.css'

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
