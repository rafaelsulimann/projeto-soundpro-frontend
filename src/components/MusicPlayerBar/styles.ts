import styled from "styled-components";

export const Container = styled.div``;

export const LinhaBranca = styled.div`
  height: 1px;
  background-color: var(--line-gray-color);
  border: none;
  width: 100%;
`;

export const MusicPlayerBarContainer = styled.div`
  min-height: 12vh;
  width: 100%;
  background-color: var(--music-dashboard-background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #36363d;

  @media (min-width: 1080px) {
    padding: 0px 65px;
  }

  @media (max-width: 1080px) {
    padding: 0px 20px;
  }
`;
