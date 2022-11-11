<script setup lang="ts">
import { ref } from "vue";
import { oof } from "simpler-fetch";

import { useStore } from "../store/index";

const mainStore = useStore();

/* Using build time variables injected in by vite, configured in vite.config.js */

// buildTime is ISO string format, so convert to Date
const buildTime = new Date(__vite_inject.buildTime).toString();

// Create version string using git branch and commit hash
const version =
  __vite_inject.gitBranch + " " + __vite_inject.commitHash.slice(0, 6);

const checkingComplete = ref<boolean>(false);
const deviceTime = ref<Date | null>(null);
const serverTime = ref<Date | null>(null);

/**
 * Function to check against network clock to show users both time,
 * so that users can see if their clock is out of sync.
 */
async function checkNetworkClock() {
  checkingComplete.value = false;

  const { res, err } = await oof
    .GET("https://worldtimeapi.org/api/ip")
    .once()
    .runJSON();

  if (err) {
    console.error(err);
    return alert("Failed to get network time!");
  }

  // Set the time after ensuring that there is no error.
  // Set device time first so the difference between them is as little as possible
  deviceTime.value = new Date();
  serverTime.value = new Date(res.unixtime * 1000);

  checkingComplete.value = true;
}
</script>

<template>
  <div class="section py-0">
    <div class="columns is-multiline">
      <div class="column is-full">
        <div class="box">
          <b class="has-text-warning-dark">Version</b>

          <!-- Fixed styles to ensure that the build time string it not too long and extend pass the mobile components -->
          <div class="level mt-1" style="font-size: 0.75em">
            Version: {{ version }}
            <br />
            Build Time: {{ buildTime }}
          </div>
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <div class="columns is-vcentered is-mobile mb-0">
            <div class="column">
              <b class="has-text-warning-dark">Stay Awake</b>
            </div>

            <div class="column is-narrow">
              <label class="form-switch">
                <!--
                    The value of this checkbox mirrors the flag on the `noSleep` object,
                    while the function to actually toggle the state/flag is defined in a store action.
                  -->
                <input
                  id="stayAwake"
                  :checked="mainStore._noSleep.isEnabled"
                  @change="mainStore.toggleStayAwake"
                  type="checkbox"
                  class="switch is-rtl is-rounded is-success"
                />
                <i></i>
              </label>
            </div>
          </div>

          <details class="content">
            <summary style="cursor: pointer">More info</summary>

            <ul>
              <li>
                Enable this if you would like your device to stay awake while
                the app is open, so that your screen will not be dimmed or
                locked after a period of inactivity.
              </li>

              <li>
                This let's you use this app as a display clock without having to
                change your device settings to make your device stay awake by
                turning off the auto-lock feature.
              </li>

              <li>
                You can also enable this using the FAB (Floating Action Button)
                in the main clock screen by clicking it to toggle.
              </li>

              <li>
                If you want to use this, this needs to be re-enabled every
                single time you open the app as this setting cannot be persisted
                across sessions. This is because to start a stay-awake session,
                the browser requires a user interaction like a button click
                before it is allowed to begin, which is why there is a FAB in
                the main clock screen for convenience sake.
              </li>

              <li>
                <b>Note</b> that this is only guaranteed to work on devices that
                support the native Wake Lock API like Android Chrome and
                currently does not include Safari. However for most iOS safari
                users this should still work thanks to this
                <a href="https://github.com/Doxee/NoSleep.js">library</a>
              </li>

              <li>
                You can track the support for WakeLock API and the library here:
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
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <div class="columns is-vcentered is-mobile mb-0">
            <div class="column">
              <b class="has-text-warning-dark">High Frequency</b>
            </div>

            <div class="column is-narrow">
              <label class="form-switch">
                <input
                  id="highFrequency"
                  v-model="mainStore.settings.highFrequencyUpdate"
                  type="checkbox"
                />
                <i></i>
              </label>
            </div>
          </div>

          <details class="content">
            <summary style="cursor: pointer">More info</summary>
            <br />

            Only select this option if you require the time to be highly
            accurate, within a 100ms accuracy range. This will cause the UI to
            update more often, so only select this if absolutely necessary.
          </details>
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <div class="select is-success is-fullwidth mb-4">
            <select
              v-model="mainStore.settings.displayFormat"
              name="displayFormat"
            >
              <option value="full">Full Date and Time</option>
              <option value="medium">Short Date and Time</option>
              <option value="short">Time only</option>
            </select>
          </div>

          <details class="content">
            <summary style="cursor: pointer">More info</summary>
            <br />

            Use this to select how you want the time to be displayed.
          </details>
        </div>
      </div>

      <div class="column is-full">
        <div class="box">
          <b class="has-text-warning-dark">
            Check time against network clock
          </b>
          <br />

          <p style="font-size: 0.8rem">
            Use this to check if your device time is accurate
          </p>

          <button
            class="button is-light is-fullwidth my-2"
            @click="checkNetworkClock"
          >
            check
          </button>

          <div v-if="checkingComplete">
            Device Time
            <p class="has-text-grey mb-2" style="font-size: 0.9rem">
              {{ deviceTime }}
            </p>

            Server Time
            <p class="has-text-grey" style="font-size: 0.9rem">
              {{ serverTime }}
            </p>
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
</template>

<style scoped>
/*
  Reference & Credits: https://www.cssscript.com/realistic-ios-switch-pure-css/

  This is the CSS copied and tweaked using the reference above to create switches
  that look and feel like iOS native switches.
*/

.form-switch {
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.form-switch i {
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;
  width: 46px;
  height: 26px;
  background-color: #e6e6e6;
  border-radius: 23px;
  vertical-align: text-bottom;
  transition: all 0.12s linear;
}
.form-switch i::before {
  content: "";
  position: absolute;
  left: 0;
  width: 42px;
  height: 22px;
  background-color: #d6d6d6;
  border-radius: 11px;
  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
  transition: all 0.12s linear;
}
.form-switch i::after {
  content: "";
  position: absolute;
  left: 0;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
  transform: translate3d(2px, 2px, 0);
  transition: all 0.12s ease-in-out;
}
.form-switch:active i::after {
  width: 28px;
  transform: translate3d(2px, 2px, 0);
}
.form-switch:active input:checked + i::after {
  transform: translate3d(16px, 2px, 0);
}
.form-switch input {
  display: none;
}
.form-switch input:checked + i {
  background-color: #4fb360;
}
.form-switch input:checked + i::before {
  transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0);
}
.form-switch input:checked + i::after {
  transform: translate3d(22px, 2px, 0);
}
</style>
