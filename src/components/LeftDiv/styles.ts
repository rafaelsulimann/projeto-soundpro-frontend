import styled from "styled-components";

export const Container = styled.div`
    @media (min-width: 1220px) {
      min-width: 320px;
    }
    @media (max-width: 1220px) {
      min-width: 220px;
    }
    @media (max-width: 1080px) {
      min-width: 100px;
    }
    display: flex;
    .album-photo {
      height: 45px;
      width: 45px;
      background-color: #2c2c32;
      border-radius: 5px;
      margin-right: 17px;
    }
    .music-gif {
      width: 25px;
    }
`;