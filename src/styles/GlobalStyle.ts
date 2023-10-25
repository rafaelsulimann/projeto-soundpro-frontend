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

    @keyframes loading {
        from {
            transform: translateY(50px) translatex(0px);
            opacity: 0;
            // background-color: transparent;
        }
        to {
            transform: translateY(0px) translatex(0px);
            opacity: 1;
            // background-color: #4b4b54;
        }
    }

    @keyframes labelEffect {
        from {
            transform: translateY(10px) translatex(10px);
            opacity: 0;
            background-color: transparent;
            font-size: 16px;
        }
        to {
        opacity: 1;
        transform: translateY(-10px) translatex(10px);
        background-color: #232325;
        font-size: 14px;
        }
    }

    @keyframes subir {
        from {
            transform: translateY(10px); /* Começa 100 pixels abaixo */
            opacity: 0;
        }
        to {
            transform: translateY(0);     /* Volta à posição original */
            opacity: 1;
        }
    }

  .options-button {
    position: relative;
    width: 5px;
    cursor: pointer;
  }
  .options-box-div {
    border: 1px solid var(--border-gray-color);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2px;
    position: absolute;
    min-height: 35px;
    background-color: #444449;
    color: var(--white-color);
  }
    .delete-div {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 3px;
      padding: 5px 10px;
    }
      .delete-option-box-icon {
        margin-right: 11px;
        width: 15px;
      }
    .edit-div {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 3px;
      padding: 5px 10px;
    }
      .edit-option-box-icon {
        margin-right: 11px;
        width: 15px;
      }
`;
