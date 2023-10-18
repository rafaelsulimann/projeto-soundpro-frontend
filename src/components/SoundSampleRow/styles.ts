import styled from "styled-components";

export const Container = styled.tr`
  width: 100%;

  .first-td {
    border-radius: 5px 0px 0px 5px;
  }
  .last-td {
    border-radius: 0px 5px 5px 0px;
  }
  .play-button {
    vertical-align: middle;
    position: relative;
    left: 2px;
  }
  .pause-button {
    vertical-align: middle;
    position: relative;
    left: 1px;
  }
  .music-gif {
    position: relative;
    left: 3px;
    top: 5px;
    width: 22px;
    height: auto;
  }
  .sound-infos {
    background-color: transparent;
    // background-color: #19191e;
    margin-right: 20px;
  }
  .sound-infos-div {
    display: flex;
    align-items: center;
  }
  .sound-infos-div img {
    width: 45px;
    height: 45px;
    margin-right: 20px;
    border-radius: 4px;
  }
  .sound-infos-div h3 {
    font-size: 16px;
    font-weight: 400;
  }
  .sounds-samples-buttons {
    background-color: transparent;
  }
  .sounds-samples-buttons h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 30px;
    color: var(--gray-light-color);
  }
  .like-button-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-button {
    width: 18px;
    height: auto;
  }
  .options-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .options-button {
    height: 20px;
  }

  .delete-div {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 3px;
    padding: 5px 10px;
  }
  .delete-option-box-icon {
    margin-right: 11px;
    width: 15px;
  }
`;
