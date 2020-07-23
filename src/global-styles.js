import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    height: 100%;
    min-width: 100%;
  }
  
  #test-pro-layout {
    height: 100%;
  }
  .ant-spin-container {
    height: 100%;
  }

  .ant-spin-nested-loading {
    height: 100%;
  }
`;

export default GlobalStyle;