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
import { mapGetters, mapMutations } from "vuex";
import { doHeapSort } from "../../util/worker-api";
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
    heapRange: {
      type: String,
    },
  },
  data() {
    return {
      interval4: {},
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval4);
  },
  watch: {
    numbers(newValue) {
      console.log("newVal", typeof newValue);
      // this.numbers = newValue;
      this.isLoading = true;
      this.postMessage();
    },
  },
  computed: {
    ...mapGetters(["getStartTimeHeapSort", "getEndTimeHeapSort"]),
  },
  mounted() {
    console.log("heap start");
    this.postMessage();
  },
  methods: {
    ...mapMutations(["setStartTimeHeapSort", "setEndTimeHeapSort"]),
    async postMessage() {
      const result = await doHeapSort(this.heapRange);
      this.difference = result.difference;
      this.startTime = getTime(result.start);
      this.endTime = getTime(result.end);
      this.isLoading = false;
      console.log("Heap sort is done");
      this.$emit("heapResult", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
