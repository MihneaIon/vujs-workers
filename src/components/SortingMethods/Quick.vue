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
import { doQuickSort } from "../../util/worker-api";
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
    quickRange: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: 0,
    };
  },
  beforeDestroy() {},
  watch: {
    numbers(newValue) {
      console.log("newVal", typeof newValue);
      // this.numbers = newValue;
      this.isLoading = true;
      this.postMessage();
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
      const result = await doQuickSort(this.quickRange);
      this.difference = result.difference;
      this.startTime = getTime(result.start);
      this.endTime = getTime(result.end);
      this.isLoading = false;
      console.log("Quick sort is done");
      this.$emit("quickResult", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
