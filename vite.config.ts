import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//currently debugging is broken in vite. This is a workaround. It reloads the page upon change.
const fullReloadAlways: PluginOption = {
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" });
    return [];
  },
} as PluginOption;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadAlways],
});
