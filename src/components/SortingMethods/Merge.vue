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
import { doMergeSort } from "../../util/worker-api";
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
    ...mapGetters(["getStartTimeMergeSort", "getEndTimeMergeSort"]),
  },
  mounted() {
    console.log("merge start");
    this.postMessage();
  },
  methods: {
    ...mapMutations(["setStartTimeMergeSort", "setEndTimeMergeSort"]),
    async postMessage() {
      this.startTime = getDate();
      this.setStartTimeMergeSort(this.startTime.date);
      const result = await doMergeSort();
      this.value2 = result;
      this.endTime = getDate();
      this.setEndTimeMergeSort(this.endTime.date);
      this.difference =
        Math.abs(this.endTime.date - this.startTime.date) / 1000;
      console.log("Merge sort is done", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
