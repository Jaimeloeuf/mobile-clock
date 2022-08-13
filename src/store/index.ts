import { defineStore } from "pinia";

// Need to define type of State object externally, to define optional properties
interface State {
  settings: {
    highFrequencyUpdate: boolean;
  };
}

export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  state: (): State => ({
    settings: {
      // Defaults to false to update less often as it is not needed for most cases
      highFrequencyUpdate: false,
    },
  }),

  // https://pinia.vuejs.org/core-concepts/actions.html
  actions: {
  },

  // https://www.npmjs.com/package/pinia-plugin-persistedstate
  // Persists this store's state in localStorage to reuse across sessions
  // Note that this is not efficient for large to extremely large state trees,
  // as on every state change, the entire tree is serialized and saved.
  //
  // https://github.com/prazdevs/pinia-plugin-persistedstate#-usage
  // This can be customised to use other storage implementations like sessionStorage
  persist: true,
});
