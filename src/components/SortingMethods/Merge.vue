<template>
  <div class="text-center">
    <Card
      :isLoading="isLoading"
      :startTime="startTime"
      :endTime="endTime"
      :difference="difference"
    ></Card>
  </div>
</template>

<script>
import { doMergeSort } from "../../util/worker-api";
import { mapGetters, mapMutations } from "vuex";
import { getTime } from "../../util/formatDate";

export default {
  components: {
    Card: () => import("../Card.vue"),
  },
  props: {
    numbers: {
      type: Array,
      default: () => [],
    },
    mergeRange: {
      type: String,
      // default: 1000
    },
  },
  data() {
    return {
      interval2: {},
      value2: {},
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval2);
  },
  watch: {
    numbers(newValue) {
      console.log("newVal merge", typeof newValue);
      // this.numbers = newValue;
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
      const result = await doMergeSort(this.mergeRange);
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
