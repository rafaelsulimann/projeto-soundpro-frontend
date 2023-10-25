import styled from "styled-components";

export const Container = styled.main`
  background-color: var(--dashboard-color);
  border-radius: 10px 10px 0px 0px;
  width: 82.3%;
  text-align: center;

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #555561;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #6b6b7a;
    }
  }
  
`;
