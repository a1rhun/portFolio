import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    // CSS 변수로 배경 관리하므로 addon-backgrounds 비활성화
    backgrounds: { disable: true },
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
