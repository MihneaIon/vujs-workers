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
        <v-chip>Difference : {{ difference }} sec </v-chip>
      </v-chip-group>
      <div class="my-4 text-subtitle-1">...</div>
    </v-card-text> -->
    <Card :isLoading="isLoading" :startTime="startTime" :endTime="endTime" :difference="difference"></Card>
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
      this.numbers = newValue;
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
      const result = await doQuickSort(this.numbers);
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
