import { useState } from "react";
import { WebSocketLoadingFilesDTO } from "../../models/loadingAudioDTO";
import LoadingFile from "../LoadingFile";
import { Container } from "./styles";

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
      <div className="loading-files-header">
        <h2>Uploads</h2>
        <div className="loading-files-header-buttons">
          <div
            className="minimize-button-div"
            onMouseEnter={handleMinimizeMouseEnterHover}
            onMouseLeave={handleMinimizeMouseLeaveHover}
            onClick={handleMinimizeUploadButton}
            style={{
              background: isMinimizedHovered
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent",
            }}
          >
            <div className="minimize-button"></div>
          </div>
          <div
            className="close-button"
            onMouseEnter={handleClosedMouseEnterHover}
            onMouseLeave={handleClosedMouseLeaveHover}
            onClick={handleClosedUploadButton}
            style={{
              background: isClosedHovered
                ? "rgba(0, 0, 0, 0.2)"
                : "transparent",
            }}
          >
            <h2>x</h2>
          </div>
        </div>
      </div>
      <hr />
      <div className="loading-file-upload-list">
        {webSocketsLoadingFiles.map((file) => (
          <LoadingFile
            loadingRequestId={file.requestId}
            isTwoElementsInLoading={webSocketsLoadingFiles.length > 2}
          />
        ))}
      </div>
    </Container>
  );
}
