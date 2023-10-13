import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 1220px) {
    min-width: 320px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  .div-microfone-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .microfone-button {
    cursor: pointer;
    width: 13px;
    @media (min-width: 1220px) {
      margin-right: 25px;
    }
    @media (max-width: 1220px) {
      margin-right: 15px;
    }
  }
  .div-eq-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .eq-button {
    cursor: pointer;
    width: 19px;
    @media (min-width: 1220px) {
      margin-right: 25px;
    }
    @media (max-width: 1220px) {
      margin-right: 15px;
    }
  }
  .user-playlist {
    width: 20px;
    @media (min-width: 1220px) {
      margin-right: 25px;
    }
    @media (max-width: 1220px) {
      margin-right: 15px;
    }
  }
  .like-button {
    width: 20px;
    @media (min-width: 1220px) {
      margin-right: 25px;
    }
    @media (max-width: 1220px) {
      margin-right: 15px;
    }
  }
  
`;
