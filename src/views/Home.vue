<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useStore } from "../store/index";

// Cannot destructure out values as it will lose its reactivity
const mainStore = useStore();

const time = ref<Date>(new Date());

// Continuously update the time every interval
// `setInterval` is not guaranteed to run every X milliseconds set, it is a best effort,
// so the timing may not be 100% exactly updated following that interval
const interval = setInterval(
  () => (time.value = new Date()),

  // If user set app to do highFrequencyUpdate, update it once every 100ms instead of 1000ms.
  // This means that the time will at most be around 100ms off instead of a 1000ms for a more accurate time.
  mainStore.settings.highFrequencyUpdate ? 100 : 1000
);

// Clear setInterval when user switches to another view like settings instead of just letting it constantly run
onUnmounted(() => clearInterval(interval));
</script>

<template>
  <!--
    Wrapping all elements of this view in a div even though vue3 allows
    for multiple elements per template without a root element.
    However, since there is a class applied to the router-view element
    in App.vue, vue will not know which sub element to apply that class
    onto, therefore, by grouping all under a div tag, the class applied
    on router-view element in App.vue will be inherited here on this div.
  -->
  <section class="section mx-3">
    <div class="columns is-centered">
      <div class="column">
        <h1 class="title has-text-weight-normal">{{ time }}</h1>
      </div>
    </div>
  </section>
</template>
