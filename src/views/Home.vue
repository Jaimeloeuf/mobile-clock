<script setup lang="ts">
import { ref } from "vue";

const time = ref<Date>(new Date());

// Continuously update the time every second
// `setInterval` is not guaranteed to run every X milliseconds set, it is a best effort,
// so the timing may not be 100% exactly updated following that interval
setInterval(() => (time.value = new Date()), 1000);
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
  <div>
    <div class="section mx-3 py-0">
      <h1 class="title has-text-weight-normal">{{ time }}</h1>
    </div>
  </div>
</template>
