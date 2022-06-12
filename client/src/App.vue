<template>
  <!--<img alt="Vue logo" src="./assets/logo.png" />-->
  <h1>Symptom Scanner</h1>
  <SymptomScanner msg="Symptom Scanner" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SymptomScanner from "./components/SymptomScanner.vue";

export default defineComponent({
  name: "App",
  components: {
    SymptomScanner,
  },
});
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
