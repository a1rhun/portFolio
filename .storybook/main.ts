import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    const { default: react } = await import("@vitejs/plugin-react");
    return mergeConfig(config, {
      plugins: [react({ jsxRuntime: "automatic" })],
      resolve: {
        alias: { "@": path.resolve(__dirname, "..") },
      },
    });
  },
};

export default config;
