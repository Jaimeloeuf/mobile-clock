import { defineStore } from "pinia";
import NoSleep from "nosleep.js";

// Need to define type of State object externally, to define optional properties
interface State {
  _noSleep: NoSleep;

  settings: {
    highFrequencyUpdate: boolean;
    displayFormat: "full" | "medium" | "short";
  };
}

export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  state: (): State => ({
    _noSleep: new NoSleep(),

    settings: {
      // Defaults to false to update less often as it is not needed for most cases
      highFrequencyUpdate: false,
      displayFormat: "full",
    },
  }),

  actions: {
    // Function to toggle stay awake state
    // The `enable` method must be wrapped in a user input event handler e.g. a mouse or touch handler to enable wake lock
    async toggleStayAwake() {
      this._noSleep.isEnabled
        ? this._noSleep.disable()
        : await this._noSleep.enable();
    },
  },

  // https://www.npmjs.com/package/pinia-plugin-persistedstate
  // Persists this store's state in localStorage to reuse across sessions
  // Note that this is not efficient for large to extremely large state trees,
  // as on every state change, the entire tree is serialized and saved.
  //
  // https://github.com/prazdevs/pinia-plugin-persistedstate#-usage
  // This can be customised to use other storage implementations like sessionStorage
  //
  // Only persists settings across sessions and ignore the shared, non-primitive noSleep object
  persist: {
    paths: ["settings"],
    storage: localStorage,
  },
});
