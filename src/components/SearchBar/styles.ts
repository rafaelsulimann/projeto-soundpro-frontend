import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .search-bar-icon {
    width: 22px;
    margin-right: 10px;
    height: 40px;
  }

`;

export const SearchBarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 10px 20px;
`;

export const SearchBarInputText = styled.input`
  width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: var(--white-color);
    font-size: 16px;
    margin-bottom: 3px;

    &:focus {
      outline: none;
    }
`;
