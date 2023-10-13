import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 15px 40px 30px;
  gap: 17px;

  h1 {
    position: relative;
    top: -1px;
    font-size: 20px;
    font-weight: 500;
    color: var(--white-color);
    text-shadow: -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000,
      1px 0px 0px #000;
  }
`;
