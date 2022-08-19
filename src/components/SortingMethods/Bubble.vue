<template>
  <div class="text-center">
  <Card :isLoading="isLoading" :startTime="startTime" :endTime="endTime" :difference="difference"></Card>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { doBubbleSort } from "../../util/worker-api";
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
  },
  data() {
    return {
      interval1: {},
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval1);
  },
  watch: {
    numbers() {
      // this.numbers = newValue;
      this.isLoading = true;
      this.postMessage();
    },
  },
  computed: {
    ...mapGetters(["getStartTimeBubbleSort", "getEndTimeBubbleSort"]),
  },
  mounted() {
    console.log("bubble start");
    this.postMessage();
  },
  methods: {
    ...mapMutations(["setStartTimeBubbleSort", "setEndTimeBubbleSort"]),
    async postMessage() {
      const result = await doBubbleSort(this.numbers);
      this.difference = result.difference;
      this.startTime = getTime(result.start);
      this.endTime = getTime(result.end);
      this.isLoading = false;
      console.log("Bubble sort is done");
      this.$emit("buubleResult", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
