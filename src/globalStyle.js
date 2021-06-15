import { createGlobalStyle } from 'styled-components';
import { color } from './util';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    background-color: ${color.veryDarkBlue};
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.color};
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 300;
    font-size: 1rem;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background 0.3s;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.color};
  }
`

export default GlobalStyle;
