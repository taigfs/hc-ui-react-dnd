// theme.ts
import { DefaultTheme } from "styled-components";

import { boardSize, cellSize } from "../enum";
export const defaultTheme: DefaultTheme = {
  boardSize: `${cellSize * boardSize}px`,
  squareSize: `${cellSize}px`,
  color: {
    text: "#fff",
    squareBg: "#000",
    squareBorder: "#333",
    featuredSquareBorder: "#10b3ec",
    featuredSquareBg: "#333",
    blockedSquareBorder: "red",
  },
};
