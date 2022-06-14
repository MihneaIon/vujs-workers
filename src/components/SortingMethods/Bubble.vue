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
import { mapGetters, mapMutations } from "vuex";
import { doBubbleSort } from "../../util/worker-api";
import { getDate } from "../../util/formatDate";

export default {
  data() {
    return {
      interval1: {},
      value1: false,
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: "",
    };
  },
  beforeDestroy() {
    clearInterval(this.interval1);
  },
  watch: {
    value1() {
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters([
      "getStartTimeBubbleSort",
      "getEndTimeBubbleSort",
      "getStartTimeMergeSort",
      "getEndTimeMergeSort",
      "getStartTimeQuickSort",
      "getEndTimeQuickSort",
      "getStartTimeHeapSort",
      "getEndTimeHeapSort",
    ]),
  },
  mounted() {
    console.log("bubble start");
    this.postMessage();
  },
  methods: {
    ...mapMutations([
      "setStartTimeBubbleSort",
      "setEndTimeBubbleSort",
      "setStartTimeMergeSort",
      "setEndTimeMergeSort",
      "setStartTimeQuickSort",
      "setEndTimeQuickSort",
      "setStartTimeHeapSort",
      "setEndTimeHeapSort",
    ]),
    async postMessage() {
      this.startTime = getDate();
      this.setStartTimeBubbleSort(this.startTime.date);
      const result = await doBubbleSort();
      this.value1 = result;
      this.endTime = getDate();
      this.setEndTimeBubbleSort(this.endTime.date);
      this.difference =
        Math.abs(this.endTime.date - this.startTime.date) / 1000;
      console.log("!!!", this.difference);
      console.log("Bubble sort is done", result);
    },
    onClickEvent(event){
      this.$emit('clicked', 'ceva')
    }
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
