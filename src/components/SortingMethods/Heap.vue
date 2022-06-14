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
import { mapGetters, mapMutations } from "vuex";
import { doHeapSort } from "../../util/worker-api";
import { getDate } from "../../util/formatDate";

export default {
  data() {
    return {
      interval4: {},
      value4: false,
      isLoading: true,
      startTime: {},
      endTime: {},
      difference: "",
    };
  },
  beforeDestroy() {
    clearInterval(this.interval4);
  },
  watch: {
    value4() {
      this.isLoading = false;
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
      this.startTime = getDate();
      this.setStartTimeHeapSort(this.startTime.date);
      const result = await doHeapSort();
      this.value4 = result;
      this.endTime = getDate();
      this.setEndTimeHeapSort(this.endTime.date);
      this.difference =
        Math.abs(this.endTime.date - this.startTime.date) / 1000;
      console.log("Heap sort is done", result);
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>
