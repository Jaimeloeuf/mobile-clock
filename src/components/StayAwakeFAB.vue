<script setup lang="ts">
import { useStore } from "../store/index";
const mainStore = useStore();
</script>

<template>
  <!--
    Easily accessible FAB for users to toggle stay awake state,
    as the stay awake setting will reset on every session because it requires a user interaction to being
  -->
  <button
    @click="mainStore.toggleStayAwake"
    class="button is-floating is-light"
    :class="{ 'is-success': mainStore._noSleep.isEnabled }"
  >
    <!-- Lock icon -->
    <svg
      v-if="mainStore._noSleep.isEnabled"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
      />
    </svg>

    <!-- Unlock icon -->
    <svg
      v-else
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M144 192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80V144C80 64.47 144.5 0 224 0C281.5 0 331 33.69 354.1 82.27C361.7 98.23 354.9 117.3 338.1 124.9C322.1 132.5 303.9 125.7 296.3 109.7C283.4 82.63 255.9 64 224 64C179.8 64 144 99.82 144 144L144 192z"
      />
    </svg>
  </button>
</template>

<style scoped>
/*
  FAB css modified from
  https://github.com/alakise/bulma-floating-button/blob/master/dist/css/bulma-floating-button.min.css
*/
.button.is-floating {
  position: fixed;
  bottom: 1em;
  right: 1em;
  border-radius: 10em;
  text-align: center;
  font-size: 1.2rem;
  box-shadow: 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  z-index: 3;
}
</style>
