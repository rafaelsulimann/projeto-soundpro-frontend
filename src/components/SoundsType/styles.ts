import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;

  .sounds-samples-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: start;
  }
  .new-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 30px;
    background-color: #ffa217;
    //background-color: #238636;
    // color: #2a2a2a;
    color: #151515;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #000;
    //border: none;
    border-radius: 4px;
  }
  .new-button input[type="file"] {
    display: none;
  }
  .new-button:hover {
    background-color: #ffbb56;
    //background-color: #2ea043;
  }

  .from-computer-button-div {
    width: 100%;
    height: 40px;
    margin-bottom: 3px;
    border-radius: 3px;
  }
  .from-computer-button {
    width: 100%;
    height: 40px;
  }
  .from-computer-button-input {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-radius: 3px;
    padding: 5px 10px;
    font-weight: 400;
  }

  .youtube-div {
    height: 40px;
    font-weight: 400;
  }
  .youtube-input {
    display: flex;
    background-color: transparent;
    width: 100%;
    height: 40px;
    font-weight: 400;
    // animation-name: subir;
    // animation-duration: 0.05s;    /* A duração da animação é de 2 segundos */
    // animation-timing-function: ease-out; /* Efeito de desaceleração ao final da animação */
  }

  .youtube-text {
    background-color: transparent;
    width: 69%;
    height: 40px;
    border: 0.5px solid white;
    padding-left: 3px;
    border-radius: 2px;
    color: white;
    margin-right: 2px;
    font-size: 16px;

    &:focus {
      outline: 0.5px solid white;
      color: white;
      padding: 3px;
      vertical-align: middle;
    }

    &::placeholder {
      color: rgb(131, 131, 131);
    }
  }

  .youtube-submit-button {
    position: relative;
    height: 40px;
    border-radius: 2px;
    width: 30%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--orange-color);
    font-size: 16px;
    color: var(--white-color);
    cursor: pointer;
  }

  .sounds-box-options-div {
    min-width: 200px;
    max-width: 200px;
    min-height: 80px;
  }
  
`;
