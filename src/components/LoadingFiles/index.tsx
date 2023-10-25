import { useState } from "react";
import { WebSocketLoadingFilesDTO } from "../../models/loadingAudioDTO";
import LoadingFile from "../LoadingFile";
import { CloseButton, CloseButtonDiv, Container, Divider, LoadingFileHeaderButtons, LoadingFileHeaderDiv, LoadingFileHeaderTitle, LoadingFileUploadListDiv, MinimizeButton, MinimizeButtonDiv } from "./styles";

type Props = {
  isTwoElementsInLoading: boolean;
  setWebSocketsLoadingFiles: any;
  webSocketsLoadingFiles: WebSocketLoadingFilesDTO[];
};

export default function LoadingFiles({
  isTwoElementsInLoading,
  setWebSocketsLoadingFiles,
  webSocketsLoadingFiles
}: Props) {

  const [isMinimizedHovered, setIsMinimizedHovered] = useState(false);
  const [isMinimizedActive, setIsMinimizedActive] = useState(false);
  const [isClosedHovered, setIsClosedHovered] = useState(false);

  function handleMinimizeMouseEnterHover() {
    setIsMinimizedHovered(true);
  }

  function handleMinimizeMouseLeaveHover() {
    setIsMinimizedHovered(false);
  }

  function handleClosedMouseEnterHover() {
    setIsClosedHovered(true);
  }

  function handleClosedMouseLeaveHover() {
    setIsClosedHovered(false);
  }

  function handleMinimizeUploadButton() {
    console.log("Entrou no minimized upload")
    console.log("isMinimizedActive", isMinimizedActive);
    setIsMinimizedActive(!isMinimizedActive);
  }

  function handleClosedUploadButton(){
    setWebSocketsLoadingFiles([]);
    setIsClosedHovered(false);
  }

  return (
    <Container
    isMinimizedActive={isTwoElementsInLoading && isMinimizedActive || isMinimizedActive}
    isTwoElementsInLoading={isTwoElementsInLoading}
    >
      <LoadingFileHeaderDiv>
        <LoadingFileHeaderTitle>Uploads</LoadingFileHeaderTitle>
        <LoadingFileHeaderButtons>
          <MinimizeButtonDiv
            onMouseEnter={handleMinimizeMouseEnterHover}
            onMouseLeave={handleMinimizeMouseLeaveHover}
            onClick={handleMinimizeUploadButton}
            style={{
              background: isMinimizedHovered
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent",
            }}
          >
            <MinimizeButton></MinimizeButton>
          </MinimizeButtonDiv>
          <CloseButtonDiv
            onMouseEnter={handleClosedMouseEnterHover}
            onMouseLeave={handleClosedMouseLeaveHover}
            onClick={handleClosedUploadButton}
            style={{
              background: isClosedHovered
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent",
            }}
          >
            <CloseButton>x</CloseButton>
          </CloseButtonDiv>
        </LoadingFileHeaderButtons>
      </LoadingFileHeaderDiv>
      <Divider isMinimizedActive={isMinimizedActive}/>
      <LoadingFileUploadListDiv isMinimizedActive={isMinimizedActive}>
        {webSocketsLoadingFiles.map((file) => (
          <LoadingFile
            loadingRequestId={file.requestId}
            isTwoElementsInLoading={webSocketsLoadingFiles.length >= 2}
          />
        ))}
      </LoadingFileUploadListDiv>
    </Container>
  );
}
