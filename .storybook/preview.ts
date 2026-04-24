import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "surface", value: "#111111" },
        { name: "light", value: "#F0EDE8" },
      ],
    },
  },
};

export default preview;