import styled from "styled-components";

export const Container = styled.div`
  margin-top: 20px;

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

`;

export const SoundTypeAndImportButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: start;
`;

export const SoundTypeTitle = styled.h2``;

export const ButtonText = styled.p``;

export const ImportButtonDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  background-color: #ffa217;
  color: #151515;
  font-size: 16px;
  font-weight: 700;
  border: 1px solid #000;
  border-radius: 4px;

  input[type="file"] {
    display: none;
  }
  &:hover {
    background-color: #ffbb56;
  }
`;

export const ImportBoxOptionDiv = styled.div`
    min-width: 200px;
    max-width: 200px;
    min-height: 80px;
`;

export const YoutubeButtonDiv = styled.div`
  display: flex;
  background-color: transparent;
  width: 100%;
  height: 40px;
  font-weight: 400;
  // animation-name: subir;
  // animation-duration: 0.05s;    /* A duração da animação é de 2 segundos */
  // animation-timing-function: ease-out; /* Efeito de desaceleração ao final da animação */
`;

export const YoutubeInputText = styled.input`
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
`;

export const YoutubeSubmitButton = styled.input`
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
`;
