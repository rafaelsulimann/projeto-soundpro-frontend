import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 25px 0px 0px;
  display: flex;
  width: 100%;
  max-height: 85vh;
  height: 85vh;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
`;
