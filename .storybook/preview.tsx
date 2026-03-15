import type { Preview } from "@storybook/react";
import React from "react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // 다크모드 기본 (tailwind darkMode: ["class"])
      document.documentElement.classList.add("dark");
      return <Story />;
    },
  ],
};

export default preview;
