// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 3;
    padding: 0;
    box-sizing: border-box;
    display:'flex '
  }
  body {
    font-family: Arial, sans-serif; 
    background-color: #121214; 
    color: #333;
  }
`;
