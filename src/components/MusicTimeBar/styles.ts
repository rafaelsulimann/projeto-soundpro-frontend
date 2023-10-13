import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 3px;

  input[type="range"] {
    width: 100%;
    border-radius: 3px;
    position: relative;
    top: -11px;
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
    right: -2px;
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
