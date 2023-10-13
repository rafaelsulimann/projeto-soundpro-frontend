import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
  .div-random-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .random-button {
    cursor: pointer;
    width: 25px;
    height: auto;
  }
  .div-back-music-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .back-music-button {
    cursor: pointer;
    width: 30px;
    height: auto;
    margin-right: 10px;
  }
  .div-play-pause-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .play-button,
  .stop-button {
    cursor: pointer;
    width: 40px;
    height: auto;
    margin-right: 10px;
  }
  .div-next-music-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .next-music-button {
    cursor: pointer;
    width: 30px;
    height: auto;
    margin-right: 20px;
  }
  .div-repeat-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .repeat-button {
    cursor: pointer;
    width: 25px;
    height: auto;
    margin-right: 20px;
  }
`;