import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSSL from "@vitejs/plugin-basic-ssl";

import childProcess from "child_process";

// Get git values to be use in the vue app
const gitValues = {
  commitHash: childProcess.execSync("git rev-parse HEAD").toString(),
  gitBranch: childProcess
    .execSync("git rev-parse --abbrev-ref HEAD")
    .toString(),
};

// https://vitejs.dev/config/
// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),

      // Plugin to enable PWA usage
      VitePWA({
        // Allow PWA to be tested in development mode
        devOptions: { enabled: true },

        registerType: "autoUpdate",

        // Values in the generated manifest file
        manifest: {
          name: "mobile-clock",
        },
      }),

      // Enable https by default as ios requires https connections to give camera access
      // https://vitejs.dev/config/server-options.html#server-https
      // https://vitejs.dev/guide/migration.html#automatic-https-certificate-generation
      basicSSL(),
    ],

    base: mode === "github-pages" ? "/mobile-clock/" : "/",

    // Replace these strings with the appropriate values during build time
    // Update `.eslintrc.cjs` and `env.d.ts` whenever new values are added to get typing and lint support
    define: {
      // CI/CD build server might not be in SG, so store date as ISO string, to create a new Date object when viewing to show time in user's locale
      "__vite_inject.buildTime": JSON.stringify(new Date()),
      "__vite_inject.commitHash": JSON.stringify(gitValues.commitHash),
      "__vite_inject.gitBranch": JSON.stringify(gitValues.gitBranch),
    },
  };
});
