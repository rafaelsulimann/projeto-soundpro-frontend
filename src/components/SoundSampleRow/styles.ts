import styled from "styled-components";

export const TableBodyRow = styled.tr`
  width: 100%;

  .last-td {
    border-radius: 0px 5px 5px 0px;
  }
`;

export const PlayPauseButton = styled.td`
  border-radius: 5px 0px 0px 5px;
  .play-button {
    vertical-align: middle;
    position: relative;
    left: 2px;
    cursor: pointer;
    width: 13px;
    height: auto;
  }
  .pause-button {
    vertical-align: middle;
    position: relative;
    left: 1px;
    cursor: pointer;
    width: 13px;
    height: auto;
  }
  .music-gif {
    position: relative;
    left: 3px;
    top: 5px;
    width: 22px;
    height: auto;
  }
`;

export const SoundInfos = styled.td`
  background-color: transparent;
  margin-right: 20px;
`;

export const SoundInfosDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const SoundImage = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 20px;
  border-radius: 4px;
`;

export const SoundName = styled.h3`
  font-size: 16px;
  font-weight: 400;
`;

export const SoundButtons = styled.td`
  background-color: transparent;

  .options-button {
    height: 20px;
    position: relative;
    width: 5px;
    cursor: pointer;
  }
`;

export const AddButton = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 30px;
  color: var(--gray-light-color);
`;

export const LikedButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .like-button {
    width: 18px;
    height: auto;
  }
`;

export const OptionsBoxDiv = styled.div`
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
