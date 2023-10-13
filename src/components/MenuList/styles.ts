import styled from "styled-components";

export const Container = styled.div`
  overflow: auto;

  h2 {
    padding: 0px 30px;
    font-size: 16px;
    color: var(--white-color);
    font-weight: 400;
    margin-bottom: 15px;
    text-shadow: -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000,
      1px 0px 0px #000;
  }

  .iconSvg {
    width: 19px;
    height: auto;
  }

`;

export const Session = styled.div`
  margin-bottom: 25px;
`;
