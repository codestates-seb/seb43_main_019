import { createGlobalStyle } from 'styled-components';
import variables from './GlobalVariables';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
        font-family: 'Roboto', sans-serif;
    }

    :root {
        ${variables};
    }

    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    ul, ol, li{
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    a {
        text-decoration: none;
    }

    a:hover, a:active, a:visited {
        text-decoration: none; 
        color: #000; 
    }

    button {
        cursor: pointer;
    }

    .hide{
        font-size: 0;
    }

`;

export default GlobalStyle;