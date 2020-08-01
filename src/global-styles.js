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

  .ant-btn-success {
  color: #fff !important;
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-success-disabled,
.ant-btn-success.disabled,
.ant-btn-success[disabled],
.ant-btn-success-disabled:hover,
.ant-btn-success.disabled:hover,
.ant-btn-success[disabled]:hover,
.ant-btn-success-disabled:focus,
.ant-btn-success.disabled:focus,
.ant-btn-success[disabled]:focus,
.ant-btn-success-disabled:active,
.ant-btn-success.disabled:active,
.ant-btn-success[disabled]:active,
.ant-btn-success-disabled.active,
.ant-btn-success.disabled.active,
.ant-btn-success[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-success:hover,
.ant-btn-success:focus {
  color: #fff !important;
  background-color: #34ce57 !important;
  border-color: #34ce57 !important;
}
.ant-btn-success:active,
.ant-btn-success.active {
  color: #fff !important;
  background-color: #1e7e34 !important;
  border-color: #1e7e34 !important;
}
.ant-btn-background-ghost.ant-btn-success {
  color: #28a745 !important;
  background: transparent !important;
  border-color: #28a745 !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-success:hover,
.ant-btn-background-ghost.ant-btn-success:focus {
  color: #34ce57 !important;
  background: transparent !important;
  border-color: #34ce57 !important;
}
.ant-btn-background-ghost.ant-btn-success:active,
.ant-btn-background-ghost.ant-btn-success.active {
  color: #28a745 !important;
  background: transparent !important;
  border-color: #1e7e34 !important;
}
.ant-btn-warning {
  color: #fff !important;
  background-color: #eca52b !important;
  border-color: #eca52b !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-warning-disabled,
.ant-btn-warning.disabled,
.ant-btn-warning[disabled],
.ant-btn-warning-disabled:hover,
.ant-btn-warning.disabled:hover,
.ant-btn-warning[disabled]:hover,
.ant-btn-warning-disabled:focus,
.ant-btn-warning.disabled:focus,
.ant-btn-warning[disabled]:focus,
.ant-btn-warning-disabled:active,
.ant-btn-warning.disabled:active,
.ant-btn-warning[disabled]:active,
.ant-btn-warning-disabled.active,
.ant-btn-warning.disabled.active,
.ant-btn-warning[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-warning:hover,
.ant-btn-warning:focus {
  color: #fff !important;
  background-color: #f0b95a !important;
  border-color: #f0b95a !important;
}
.ant-btn-warning:active,
.ant-btn-warning.active {
  color: #fff !important;
  background-color: #d18b13 !important;
  border-color: #d18b13 !important;
}
.ant-btn-background-ghost.ant-btn-warning {
  color: #eca52b !important;
  background: transparent !important;
  border-color: #eca52b !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-warning:hover,
.ant-btn-background-ghost.ant-btn-warning:focus {
  color: #f0b95a !important;
  background: transparent !important;
  border-color: #f0b95a !important;
}
.ant-btn-background-ghost.ant-btn-warning:active,
.ant-btn-background-ghost.ant-btn-warning.active {
  color: #eca52b !important;
  background: transparent !important;
  border-color: #d18b13 !important;
}
.ant-btn-info {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
.ant-btn-info-disabled,
.ant-btn-info.disabled,
.ant-btn-info[disabled],
.ant-btn-info-disabled:hover,
.ant-btn-info.disabled:hover,
.ant-btn-info[disabled]:hover,
.ant-btn-info-disabled:focus,
.ant-btn-info.disabled:focus,
.ant-btn-info[disabled]:focus,
.ant-btn-info-disabled:active,
.ant-btn-info.disabled:active,
.ant-btn-info[disabled]:active,
.ant-btn-info-disabled.active,
.ant-btn-info.disabled.active,
.ant-btn-info[disabled].active {
  color: rgba(0, 0, 0, 0.25) !important;
  background-color: #f5f5f5 !important;
  border-color: #d9d9d9 !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
.ant-btn-info:hover,
.ant-btn-info:focus {
  color: #fff !important;
  background-color: #1fc8e3 !important;
  border-color: #1fc8e3 !important;
}
.ant-btn-info:active,
.ant-btn-info.active {
  color: #fff !important;
  background-color: #117a8b !important;
  border-color: #117a8b !important;
}
.ant-btn-background-ghost.ant-btn-info {
  color: #17a2b8 !important;
  background: transparent !important;
  border-color: #17a2b8 !important;
  text-shadow: none !important;
}
.ant-btn-background-ghost.ant-btn-info:hover,
.ant-btn-background-ghost.ant-btn-info:focus {
  color: #1fc8e3 !important;
  background: transparent !important;
  border-color: #1fc8e3 !important;
}
.ant-btn-background-ghost.ant-btn-info:active,
.ant-btn-background-ghost.ant-btn-info.active {
  color: #17a2b8 !important;
  background: transparent !important;
  border-color: #117a8b !important;
}
`;

export default GlobalStyle;
