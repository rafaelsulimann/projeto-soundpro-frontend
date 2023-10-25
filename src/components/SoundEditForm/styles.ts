import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const EditPopupDiv = styled.div`
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
`;

export const EditPopupTitleDiv = styled.div`
  display: flex;
`;

export const EditPopupTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const EditPopupForm = styled.form`
  input {
    width: 100%;
    color: white;
    margin-bottom: 20px;
    padding: 15px 10px;
    background-color: transparent;
    border-radius: 6px;
    border: 1px solid var(--line-gray-color);
    &:focus {
      outline: none;
    }
  }

  label {
    position: absolute;
    padding: 15px 10px;
    pointer-events: none;
    font-size: 14px;
    animation-name: labelEffect;
    animation-duration: 0.3s; /* A duração da animação é de 2 segundos */
    animation-timing-function: ease-out; /* Efeito de desaceleração ao final da animação */
  }
`;

export const EditPopupFormInputTextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const EditPopupFormSubmitButton = styled.input`
  color: #fff;
  width: 100%;
`;

export const ErrorMessageTextDiv = styled.div``;
