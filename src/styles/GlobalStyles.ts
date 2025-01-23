import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(76, 175, 80, 0.3) transparent;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    overflow-y: auto; /* Enable vertical scrolling */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  /* Custom scrollbar styles */
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(76, 175, 80, 0.3);
    border-radius: 4px;

    &:hover {
      background-color: rgba(76, 175, 80, 0.5);
    }
  }
`; 