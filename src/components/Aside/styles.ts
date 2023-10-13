import styled from "styled-components";

export const Container = styled.aside`
  width: 16%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;

  .logoImg {
    width: 35px;
    height: auto;
    fill: var(--purple-color);
  }

  @media (max-height: 713.60px) {
    max-height: 83vh;
  }
  @media (min-height: 714px) {
    min-height: 85vh;
    max-height: 85vh;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #2c2c32;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #3f3f48;
    }
  }
`;
