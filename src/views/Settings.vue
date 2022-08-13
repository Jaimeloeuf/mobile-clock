<script setup lang="ts">
import version from "../components/Version.vue";
import { useStore } from "../store/index";

// Cannot destructure out values as it will lose its reactivity
const mainStore = useStore();
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
    <div class="section py-0">
      <div class="columns is-multiline">
        <div class="column is-full">
          <div class="box">
            <h3 class="subtitle">High Frequency Update?</h3>

            <details class="content mt-4">
              <summary style="cursor: pointer">More info</summary>
              <br />

              Only select this option if you require the time to be highly
              accurate, within a 100ms accuracy range. This will cause the UI to
              update more often, so only select this if absolutely necessary.
            </details>

            <div class="field">
              <input
                id="switchColorSuccess"
                v-model="mainStore.settings.highFrequencyUpdate"
                type="checkbox"
                name="switchColorSuccess"
                class="switch is-rounded is-success"
              />

              <label for="switchColorSuccess">High Frequency</label>
            </div>
          </div>
        </div>

        <div class="column is-full">
          <div class="box">
            <h3 class="subtitle">Display Format</h3>

            <details class="content mt-4">
              <summary style="cursor: pointer">More info</summary>
              <br />

              Use this to select how you want the time to be displayed.
            </details>

            <div class="select is-success is-fullwidth mb-5">
              <select
                v-model="mainStore.settings.displayFormat"
                name="displayFormat"
              >
                <option value="full">Full DateTime</option>
                <option value="medium">Short Date and Time</option>
                <option value="short">Time only</option>
              </select>
            </div>
          </div>
        </div>

        <div class="column is-full">
          <router-link
            :to="{ name: 'home' }"
            class="button is-light is-success is-fullwidth"
          >
            Home
          </router-link>
        </div>
      </div>

      <version />
    </div>
  </div>
</template>
