import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OptionsBoxDiv = styled.div`
  border: 1px solid var(--border-gray-color);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2px;
  position: absolute;
  min-height: 35px;
  background-color: #444449;
  color: var(--white-color);

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
  .edit-div {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 3px;
    padding: 5px 10px;
  }
  .edit-option-box-icon {
    margin-right: 11px;
    width: 15px;
  }
`;
