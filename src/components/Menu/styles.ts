import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 30px;
  border-radius: 4px;
  width: 95%;

  gap: 17px;

  list-style: none;
  font-size: 14px;
  color: var(--gray-light-color);
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #404049; // Você pode escolher a cor que preferir aqui.
  }
`;
