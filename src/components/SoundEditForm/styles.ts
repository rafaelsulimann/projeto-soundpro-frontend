import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .sound-edit-form-div {
    position: absolute;
    width: 450px;
    height: 420px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #232325;
    color: white;
    border-radius: 10px;
    padding: 20px;
  }
  .sound-edit-form-title {
    display: flex;
  }
  .sound-edit-form-title h2 {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  .sound-edit-form input {
    margin-bottom: 20px;
    padding: 15px 10px;
    background-color: transparent;
    border-radius: 6px;
    border: 1px solid var(--line-gray-color);
    &:focus {
      outline: none;
    }
  }
  .sound-edit-form label {
    position: absolute;
    padding: 15px 10px;
    pointer-events: none;
    font-size: 14px;
    animation-name: labelEffect;
    animation-duration: 0.3s; /* A duração da animação é de 2 segundos */
    animation-timing-function: ease-out; /* Efeito de desaceleração ao final da animação */
  }
  .sound-edit-form-input-text {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .sound-edit-form-input-text input {
    color: #fff;
    width: 100%;
  }
`;
