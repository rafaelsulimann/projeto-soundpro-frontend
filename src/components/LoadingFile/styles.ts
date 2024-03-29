import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 6.75px 15px 15px;
  width: 100%;
  height: 57px;
  h2 {
    font-size: 16px;
    font-weight: 400;
    color: black;
    max-width: 200px;
  }
  .box {
    position: relative;
    top: 3px;
    left: -3.5px;
  }
  .box-circle svg {
    width: 23px;
    height: 23px;
    position: relative;
  }
  .box-circle-svg {
    transform-origin: center center;
    transform: rotate(270deg);
    width: 23px;
    height: 23px;
    fill: none;
    stroke: black;
    stroke-width: 4;
    stroke-dasharray: 51;
    stroke-dashoffset: 51;
  }
  .box-circle-svg:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: var(--dashboard-color);
  }
  .box-circle-svg:nth-child(2) {
    stroke: var(--orange-color);
    transition: stroke-dashoffset 0.5s;
  }
`;
