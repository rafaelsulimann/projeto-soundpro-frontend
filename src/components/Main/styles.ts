import styled from "styled-components";

export const Container = styled.main`
  background-color: var(--dashboard-color);
  border-radius: 10px 10px 0px 0px;
  width: 84%;
  text-align: center;
  overflow: auto;

  @media (max-height: 713.60px) {
    max-height: 83vh;
  }
  @media (min-height: 714px) {
    min-height: 85vh;
    max-height: 85vh;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #555561;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #6b6b7a;
    }
  }
`;
