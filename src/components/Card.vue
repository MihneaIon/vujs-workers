<template>
  <div class="text-center">
    <v-progress-circular
      v-show="isLoading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-card-text v-if="isLoading == false">
      <div style="color: green"><b> Success! </b></div>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip>{{ startTime.dateDispaly }}</v-chip>
        <v-chip>{{ endTime.dateDispaly }}</v-chip>
      </v-chip-group>
      <v-chip-group>
        <v-chip>Difference : {{ difference }} sec</v-chip>
      </v-chip-group>
      <div class="my-4 text-subtitle-1">...</div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Object,
      default: null,
    },
    endTime: {
      type: Object,
      default: null,
    },
    difference: {
      type: Number,
      default: 0.0,
    },
  },
  data() {
    return {
      interval4: {},
    };
  },
};
</script>

<style scoped></style>
