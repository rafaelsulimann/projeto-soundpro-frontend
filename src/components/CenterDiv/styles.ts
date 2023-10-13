import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 90px;
  height: 90px;

  @media (max-width: 800px) {
    margin-right: 10px;
  }
  
`;
