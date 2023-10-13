import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: "PT Root UI", sans-serif;
    };

    :root {
        --green-color: #1ed760;
        --white-color: #fff;
        --purple-color: #884bfd;
        --background-color: #1b1b1f;
        --dashboard-color: #222228;
        --music-dashboard-background-color: #19191e;
        --line-gray-color: #404049;
        --gray-light-color: #999aa7;
        --gray-selected-color: #4b4b54;
        --border-gray-color: #838289;
        --orange-color: #fc9700;
    };

    body {
        background-color: var(--background-color);
        color: var(--white-color);
    };

    .box-hover {
        background-color: #37373c;
        font-size: 15px;
        padding: 7px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation-name: slide;
        animation-duration: 0.2s;
    };

    .link {
        text-decoration: none;
    }

    @keyframes slide {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
    };

`;
