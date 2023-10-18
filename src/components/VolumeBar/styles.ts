import styled from "styled-components";

export const Container = styled.div`
  height: 10px;
  width: 100px;
  display: flex;
  align-items: center;

  input[type="range"] {
    width: 100%;
    border-radius: 3px;
    height: 5.5px;
    outline: none;
    appearance: none;
    -webkit-appearance: none; /* Remove a aparência padrão do navegador */
    cursor: pointer;
    pointer-events: auto;
  }

  input[type="range"]::-webkit-slider-thumb {
    display: none;
    cursor: pointer;
    pointer-events: auto;
    -webkit-appearance: none; /* Remove a aparência padrão do navegador */
    position: relative;
    top: 3.5px;
    background-color: #fff; /* Cor da bolinha */
    width: 12px; /* Largura da bolinha */
    height: 12px; /* Altura da bolinha */
    border-radius: 50%; /* Deixa a bolinha arredondada */
    margin-top: -8px; /* Ajusta a posição da bolinha */
  }

  input[type="range"]:hover::-webkit-slider-thumb {
    display: block;
  }

`;
