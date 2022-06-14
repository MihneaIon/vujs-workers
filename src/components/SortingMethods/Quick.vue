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
        <v-chip>Difference : {{ difference }} sec </v-chip>
      </v-chip-group>
      <div class="my-4 text-subtitle-1">...</div>
    </v-card-text>
  </div>
</template>

<script>
import { doQuickSort } from "../../util/worker-api";
import { mapGetters, mapMutations } from "vuex";
import { getDate } from "../../util/formatDate";

export default {
  data() {
    return {
      interval2: {},
      value2: false,
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: "",
    };
  },
  beforeDestroy() {
    clearInterval(this.interval2);
  },
  watch: {
    value2() {
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters(["getStartTimeQuickSort", "getEndTimeQuickSort"]),
  },
  mounted() {
    console.log("quick has started");
    this.postMessage();
  },
  methods: {
    ...mapMutations(["setStartTimeQuickSort", "setEndTimeQuickSort"]),
    async postMessage() {
      this.startTime = getDate();
      this.setStartTimeQuickSort(this.startTime.date);
      const result = await doQuickSort();
      this.value2 = result;
      this.endTime = getDate();
      this.setEndTimeQuickSort(this.endTime.date);
      this.difference =
        Math.abs(this.endTime.date - this.startTime.date) / 1000;
      console.log("Quick sort is done", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
