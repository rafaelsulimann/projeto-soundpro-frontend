import styled from "styled-components";

export const Container = styled.div<{
  isMinimizedActive?: boolean;
  isTwoElementsInLoading?: boolean;
}>`
  position: fixed;
  width: 300px;
  background-color: #4b4b54;
  border-radius: 20px 20px 0px 0px;
  animation-name: loading;
  animation-duration: 0.5s; /* A duração da animação é de 2 segundos */
  animation-timing-function: ease-in; /* Efeito de desaceleração ao final da animação */
  max-height: ${(props) => (props.isMinimizedActive ? "60px" : "177px")};
  right: 4.75%;
  @media (max-height: 713.6px) {
    top: ${(props) =>
      props.isMinimizedActive
        ? "75.5%"
        : props.isTwoElementsInLoading
        ? "56.75%"
        : "65.7%"};
    // min-height: 120px;
  }
  @media (min-height: 714px) {
    top: ${(props) =>
      props.isMinimizedActive
        ? "81%"
        : props.isTwoElementsInLoading
        ? "69.5%"
        : "74.25%"};
    // min-height: 120px;
  }
`;

export const LoadingFileHeaderDiv = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

export const LoadingFileHeaderTitle = styled.h2``;

export const LoadingFileHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MinimizeButtonDiv = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-right: 30px;
  width: 30px;
  height: 30px;
`;

export const MinimizeButton = styled.div`
  width: 11px;
  height: 11px;
  border: none;
  background-color: transparent;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  transform-origin: center center;
  border-radius: 0px 0px 2px 0px;
  transform: rotate(45deg);
  position: relative;
  top: -2.5px;
`;

export const CloseButtonDiv = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  border: none;
  text-align: center;
`;

export const CloseButton = styled.h2`
  position: relative;
  top: -1px;
  font-size: 22px;
  font-weight: 400;
  color: black;
`;

export const Divider = styled.hr<{
  isMinimizedActive?: boolean;
  isTwoElementsInLoading?: boolean;
}>`
  display: ${(props) => (props.isMinimizedActive ? "none" : "block")};
  background-color: black;
  color: black;
  border: 1px solid black;
`;

export const LoadingFileUploadListDiv = styled.div<{
  isMinimizedActive?: boolean;
  isTwoElementsInLoading?: boolean;
}>`
  overflow: auto;
  display: ${(props) => (props.isMinimizedActive ? "none" : "flex")};
  flex-direction: column;
  max-height: 114px;

  &:hover::-webkit-scrollbar-thumb {
    background-color: #555561;
  }
  &:hover::-webkit-scrollbar-thumb:hover {
    background-color: #6b6b7a;
  }
`;
