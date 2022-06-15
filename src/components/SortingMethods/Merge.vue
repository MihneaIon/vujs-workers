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
import { getTime } from "../../util/formatDate";

export default {
  props: {
    numbers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      interval2: {},
      value2: {},
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
    numbers(newValue) {
      this.numbers = newValue;
      this.isLoading = true;
      this.postMessage();
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
      const result = await doMergeSort(this.numbers);
      this.difference = result.difference;
      this.startTime = getTime(result.start);
      this.endTime = getTime(result.end);
      this.isLoading = false;
      console.log("Merge sort is done");
      this.$emit("mergeResult", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
