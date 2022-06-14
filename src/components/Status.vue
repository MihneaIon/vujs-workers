<template>
  <div class="text-center">
    <div>
      <v-row class="custom-row mx-auto" align="center" justify="space-around">
        <v-card class="mx-auto" outlined>
          <v-card-title> Buuble Sort </v-card-title>
          <Bubble v-if="getStartComputation" @click="onClickEvent"></Bubble>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Merge Sort </v-card-title>
          <Merge v-if="getStartComputation"></Merge>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Quick Sort </v-card-title>
          <Quick v-if="getStartComputation"></Quick>
        </v-card>
        <v-card class="mx-auto" outlined>
          <v-card-title> Heap Sort </v-card-title>
          <Heap v-if="getStartComputation"></Heap>
        </v-card>
      </v-row>
    </div>

    <button class="title" @click="start()">send message</button>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Bubble: () => import("./SortingMethods/Bubble.vue"),
    Merge: () => import("./SortingMethods/Merge.vue"),
    Quick: () => import("./SortingMethods/Quick.vue"),
    Heap: () => import("./SortingMethods/Heap.vue"),
  },

  data() {
    return {
      startorting: false,
      time: new Date(),
    };
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters(["getStartComputation"]),
  },
  watch: {
    value1() {
      // this.isLoading = false;
      this.setStartComutation(true);
    },
  },
  mounted() {
    setInterval(() => {
      this.time = new Date();
    }, 300);
  },
  methods: {
    ...mapMutations(["setStartComutation"]),
    start() {
      this.setStartComutation(true);
      this.startorting = true;
      console.log(this.startorting);
    },
    onClickEvent(value){
      console.log("@@@@@@", value)
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
.custom-row {
  margin: 5% !important;
}
.custom-button {
  margin: 5% !important;
}
.title {
  margin: 2%;
  border: thin solid #00bfaf;
  border-radius: 20%;
}
</style>
