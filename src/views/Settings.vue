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
          <div class="box"><version /></div>
        </div>

        <div class="column is-full">
          <div class="box">
            <h3 class="subtitle">Stay Awake?</h3>

            <details class="content mt-4">
              <summary style="cursor: pointer">More info</summary>

              <ul>
                <li>
                  Enable this if you would like your device to stay awake while
                  the app is open, so that your screen will not be dimmed or
                  locked after a period of inactivity.
                </li>

                <li>
                  This let's you use this app as a display clock without having
                  to change your device settings to make your device stay awake
                  by turning off the auto-lock feature.
                </li>

                <li>
                  You can also enable this using the FAB (Floating Action
                  Button) in the main clock screen by clicking it to toggle.
                </li>

                <li>
                  If you want to use this, this needs to be re-enabled every
                  single time you open the app as this setting cannot be
                  persisted across sessions. This is because to start a
                  stay-awake session, the browser requires a user interaction
                  like a button click before it is allowed to begin, which is
                  why there is a FAB in the main clock screen for convenience
                  sake.
                </li>

                <li>
                  <b>Note</b> that this is only guaranteed to work on devices
                  that support the native Wake Lock API like Android Chrome and
                  currently does not include Safari. However for most iOS safari
                  users this should still work thanks to this
                  <a href="https://github.com/Doxee/NoSleep.js">library</a>
                </li>

                <li>
                  You can track the support for WakeLock API and the library
                  here:
                  <ul style="word-wrap: break-word">
                    <li>
                      <a href="https://caniuse.com/wake-lock" target="_blank">
                        https://caniuse.com/wake-lock
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/richtr/NoSleep.js/issues/135"
                        target="_blank"
                      >
                        https://github.com/richtr/NoSleep.js/issues/135
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://stackoverflow.com/questions/9709891/prevent-ios-mobile-safari-from-going-idle-auto-locking-sleeping"
                        target="_blank"
                      >
                        https://stackoverflow.com/questions/9709891/prevent-ios-mobile-safari-from-going-idle-auto-locking-sleeping
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </details>

            <div class="field">
              <!--
                The value of this checkbox mirrors the flag on the `noSleep` object,
                while the function to actually toggle the state/flag is defined in a store action.
              -->
              <input
                id="switchColorSuccess"
                :checked="mainStore._noSleep.isEnabled"
                @change="mainStore.toggleStayAwake"
                type="checkbox"
                name="switchColorSuccess"
                class="switch is-rounded is-success"
              />

              <label for="switchColorSuccess">Stay Awake</label>
            </div>
          </div>
        </div>

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
                <option value="full">Full Date and Time</option>
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
    </div>
  </div>
</template>
