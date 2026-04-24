import React from "react";
import path from "path";
import { defineConfig } from "playroom/config";

export default defineConfig({
  components: path.join(__dirname, "./src/playroom-components.js"),
  outputPath: path.join(__dirname, "./playroom-dist"),
  title: "TransformFit Playroom",
  themes: ["dark"],
  widths: [375, 768, 1024],
  typeScript: false,
  frameComponent: () => null,
});