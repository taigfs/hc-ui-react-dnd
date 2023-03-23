import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    squareSize: string;
    boardSize: string;
    color: {
      text: string;
      secondaryText: string;
      squareBg: string;
      squareBorder: string;
      featuredSquareBorder: string;
      featuredSquareBg: string;
      blockedSquareBorder: string;
    };
  }
}
