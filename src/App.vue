<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/images.png" />
    <progreStatus></progreStatus>
  </div>
</template>

<script>
import progreStatus from "./components/Status.vue";

export default {
  name: "App",
  components: {
    progreStatus,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
