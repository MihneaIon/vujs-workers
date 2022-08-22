<template>
  <div class="text-center">
    <!-- <v-progress-circular
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
    </v-card-text> -->

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
    numbers(newValue) {
      console.log('newVal', typeof(newValue))
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
