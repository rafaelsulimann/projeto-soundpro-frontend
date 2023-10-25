import { useContext, useEffect, useRef, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import soundImg from "../../assets/capa-pack.png";
import PauseRowButton from "../Icons/Buttons/PauseRow";
import PlayRowButton from "../Icons/Buttons/PlayRow";
import LikeButton from "../Icons/Buttons/Like";
import Points3Button from "../Icons/Buttons/3Points";
import * as soundService from "../../services/sound-service";
import MusicGifIcon from "../Icons/MusicGif";
import BoxOption from "../BoxOption";
import deleteIcon from "../../assets/delete-button.svg";
import editIcon from "../../assets/edit-button.svg";
import {
  AddButton,
  LikedButtonDiv,
  OptionsBoxDiv,
  PlayPauseButton,
  SoundButtons,
  SoundImage,
  SoundInfos,
  SoundInfosDiv,
  SoundName,
  TableBodyRow,
} from "./styles";

type Props = {
  audio: AudioDTO;
  onDeleteAudioFile: any;
  onEditAudioFile: any;
  onClick: any;
  index: number;
  isSelected: boolean;
  scrollRowHoveredId: string;
  setIsBoxOptionOpen: any;
  on3PointsClick: any;
  is3PointsClicked: boolean;
  isRightButtonClicked: boolean;
  onRightButtonClick: any;
  updatedAudio: AudioDTO;
};

export default function SoundSampleRow({
  audio,
  onDeleteAudioFile,
  onEditAudioFile,
  onClick,
  index,
  isSelected,
  scrollRowHoveredId,
  setIsBoxOptionOpen,
  on3PointsClick,
  is3PointsClicked,
  isRightButtonClicked,
  onRightButtonClick,
  updatedAudio,
}: Props) {
  const { src, setSrc, isPlaying, setIsPlaying, setLiked } =
    useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");
  const [updatedAudioCount, setUpdateAudioCount] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [firstRenderScrollRowHoveredIdCount, setFirstRenderCount] = useState(0);
  const trRef = useRef<HTMLTableRowElement>(null);

  //1º - Seta o Audio do SoundSampleRow
  useEffect(() => {
    loadAudio();
  }, []);

  //1º - interrompe a primeira execução quando a tela é renderizada
  //2º - verifica se algum audio foi alterado o nome, ele verificar se este audio que foi alterado é igual ao que está tocando ou em stand by no reproduto de musica, pois então nós iremos atualizar a referencia do audio no firebase storage.
  useEffect(() => {
    if (updatedAudioCount === 0) {
      setUpdateAudioCount((prevState) => prevState + 1);
      return;
    }
    if (
      isThisRowTheLastUpdatedAudioAndIsCurrentPlaying() ||
      isThisRowTheLastUpdatedAudioAndIsNotPlaying()
    ) {
      loadUpdatedAudio();
    }
  }, [updatedAudio, isPlaying]);

  //1º - interrompe a primeira execução quando a tela é renderizada
  //2º - Verificar se o mouse está atualmente em cima deste row ou não, e caso estiver, ele irá setar o estado de "isHovered" para true
  useEffect(() => {
    if (firstRenderScrollRowHoveredIdCount === 0) {
      setFirstRenderCount((prevState) => prevState + 1);
      return;
    }
    if (theMouseIsUpFromThisRow()) {
      if (!thisRowIsCurrentlyHovered()) {
        enableHover();
      }
      return;
    }
    if (thisRowIsCurrentlyHovered()) {
      disableHover();
      return;
    }
  }, [scrollRowHoveredId]);

  useEffect(() => {
    if (isSoundOptionBoxOpenByRightClick()) {
      // Adiciona event listener para o evento "click" no objeto window
      window.addEventListener("click", validateMouseClickInSoundOptionBox);
    } else {
      // Remove event listener quando a box é fechada
      window.removeEventListener("click", validateMouseClickInSoundOptionBox);
    }

    // Função que é chamada quando o evento "click" é acionado no objeto window
    function validateMouseClickInSoundOptionBox(event: MouseEvent) {
      if (!isMouseClickInSoundOptionBox(event)) {
        // Fecha a box se o elemento clicado não estiver dentro da box ou do botão
        closeSoundOptionsBoxByRightClick();
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", validateMouseClickInSoundOptionBox);
    };
  }, [isRightButtonClicked]);

  function handleDeleteClick() {
    closeSoundOptionsBoxByRightClick();
    soundService
      .deleteSoundById(audio.id)
      .then(() => {
        console.log(`Sound ${audio.name} deleted successfully`);
        excludesDeletedSoundInDashboard();
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  function handleEditClick() {
    openEditPopup();
  }

  function handleDownloadClick() {
    closeSoundOptionsBoxByRightClick();
    soundService
      .downloadSound(audio.id)
      .then((response) => {
        startDownload(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateSrc(event: any, newSrc: string, liked: boolean) {
    removeEventDefaultFunction(event);
    if (isSoundOptionBoxOpenBy3Points()) {
      closeSoundOptionBoxBy3Points();
    }
    if (notHaveSoundInPlayer()) {
      insertNewSoundInPlayer(newSrc, liked);
    }
    if (isThisSoundEqualsCurrentSound(newSrc)) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      insertNewSoundInPlayer(newSrc, liked);
      if (isPlaying) {
        pause();
      }
    }
  }

  function handleRowClick() {
    if (isSoundOptionBoxOpenByRightClick()) {
      selectSound();
    } else {
      if (isThisSoundCurrentlySelected()) {
        unselectSound();
      } else {
        selectSound();
      }
    }
  }

  function handleRowMouseEnterHover() {
    setIsHovered(true);
  }

  function handleRowMouseLeaveHover() {
    setIsHovered(false);
  }

  function handleRightClick(event: React.MouseEvent<HTMLTableRowElement>) {
    event.preventDefault();
    if (!isThisSoundCurrentlySelected()) {
      selectSound();
    }
    if (isSoundOptionBoxOpenBy3Points()) {
      closeSoundOptionsBoxBy3points();
    }
    openSoundOptionBoxByRightClick(event);
  }

  function handlePoints3ButtonClick() {
    if (!isThisSoundCurrentlySelected()) {
      selectSound();
    }
    if (isSoundOptionBoxOpenByRightClick()) {
      closeSoundOptionsBoxByRightClick();
    }
    openSoundOptionBoxBy3Points();
  }

  function loadAudio() {
    setBlobSrc(audio.audioUrl);
  }

  function isThisRowTheLastUpdatedAudioAndIsCurrentPlaying() {
    return updatedAudio.id === audio.id && isPlaying && blobSrc !== src;
  }

  function isThisRowTheLastUpdatedAudioAndIsNotPlaying() {
    return updatedAudio.id === audio.id && !isPlaying && blobSrc !== src;
  }

  function loadUpdatedAudio() {
    setBlobSrc(updatedAudio.audioUrl);
  }

  function theMouseIsUpFromThisRow() {
    return scrollRowHoveredId === audio.id;
  }

  function thisRowIsCurrentlyHovered() {
    return isHovered;
  }

  function enableHover() {
    setIsHovered(true);
  }

  function disableHover() {
    setIsHovered(false);
  }

  function isSoundOptionBoxOpenByRightClick() {
    return isRightButtonClicked && boxRef.current;
  }

  function isMouseClickInSoundOptionBox(event: MouseEvent) {
    return boxRef.current?.contains(event.target as Node);
  }

  function closeSoundOptionsBoxByRightClick() {
    onRightButtonClick(audio);
    setRightClickPosition({ x: 0, y: 0 });
    unlockScrollInMainDiv();
  }

  function closeSoundOptionsBoxBy3points() {
    on3PointsClick(audio);
    unlockScrollInMainDiv();
  }

  function unlockScrollInMainDiv() {
    setIsBoxOptionOpen(false);
  }

  function excludesDeletedSoundInDashboard() {
    onDeleteAudioFile(audio.id);
  }

  function openEditPopup() {
    onRightButtonClick(audio);
    onEditAudioFile(audio);
  }

  function startDownload(response: any) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    const audioName = audio.name + ".mp3";
    link.href = url;
    link.setAttribute("download", audioName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  function removeEventDefaultFunction(event: any) {
    event.stopPropagation();
  }

  function pause() {
    setIsPlaying(!isPlaying);
  }

  function play() {
    setIsPlaying(!isPlaying);
  }

  function isThisSoundEqualsCurrentSound(newSrc: string) {
    return src === newSrc;
  }

  function insertNewSoundInPlayer(newSrc: string, liked: boolean) {
    setSrc(newSrc);
    setLiked(liked);
  }

  function notHaveSoundInPlayer() {
    return src === "" || src === undefined;
  }

  function closeSoundOptionBoxBy3Points() {
    on3PointsClick(audio);
  }

  function isSoundOptionBoxOpenBy3Points() {
    return is3PointsClicked;
  }

  function selectSound() {
    closeSoundOptionsBoxByRightClick();
    onClick(audio);
  }

  function unselectSound() {
    closeSoundOptionsBoxByRightClick();
    onClick(audio);
  }

  function isThisSoundCurrentlySelected() {
    return isSelected;
  }

  function openSoundOptionBoxByRightClick(
    event: React.MouseEvent<HTMLTableRowElement>
  ) {
    updatePositionBox(event);
    if (isSoundOptionBoxOpenByRightClick()) {
      lockScrollInMainDiv();
      return;
    }
    onRightButtonClick(audio);
    lockScrollInMainDiv();
  }

  function lockScrollInMainDiv() {
    setIsBoxOptionOpen(true);
  }

  function updatePositionBox(event: React.MouseEvent<HTMLTableRowElement>) {
    setRightClickPosition({ x: event.clientX, y: event.clientY });
  }

  function openSoundOptionBoxBy3Points() {
    on3PointsClick(audio);
    lockScrollInMainDiv();
  }

  const bgSoundRowHoverColor = isHovered
    ? "var(--line-gray-color)"
    : "transparent";
  const bgSoundRowSelectedColor = isSelected
    ? "var(--gray-selected-color)"
    : "transparent";

  return (
    <>
      <TableBodyRow
        id="sounds-samples-row"
        ref={trRef}
        data-id={audio.id}
        onMouseEnter={handleRowMouseEnterHover}
        onMouseLeave={handleRowMouseLeaveHover}
        onClick={handleRowClick}
        onContextMenu={handleRightClick}
        style={{
          background: isSelected
            ? bgSoundRowSelectedColor
            : bgSoundRowHoverColor,
        }}
      >
        <PlayPauseButton>
          {src === `${blobSrc}` ? (
            isPlaying ? (
              isHovered ? (
                <PauseRowButton
                  simbolColor="var(--orange-color)"
                  className="pause-button"
                  blobSrc={blobSrc}
                  liked={audio.liked}
                  onClick={handleUpdateSrc}
                />
              ) : (
                <MusicGifIcon
                  stroke="var(--orange-color)"
                  className="music-gif"
                />
              )
            ) : (
              <PlayRowButton
                simbolColor="var(--orange-color)"
                className="play-button"
                blobSrc={blobSrc}
                liked={audio.liked}
                onClick={handleUpdateSrc}
              />
            )
          ) : isHovered && src !== `${audio?.audioUrl}` ? (
            <PlayRowButton
              simbolColor="var(--orange-color)"
              className="play-button"
              blobSrc={blobSrc}
              liked={audio.liked}
              onClick={handleUpdateSrc}
            />
          ) : (
            index
          )}
        </PlayPauseButton>
        <SoundInfos>
          <SoundInfosDiv>
            <SoundImage src={soundImg} alt="soundImg" />
            <SoundName>{audio?.name}</SoundName>
          </SoundInfosDiv>
        </SoundInfos>
        <SoundButtons>
          {audio.liked ? (
            <LikedButtonDiv className="like-button-div">
              <LikeButton
                simbolColor="rgb(166, 54, 54)"
                className="like-button"
              />
            </LikedButtonDiv>
          ) : (
            <LikedButtonDiv className="like-button-div">
              <LikeButton
                simbolColor="var(--orange-color)"
                className="like-button"
              />
            </LikedButtonDiv>
          )}
        </SoundButtons>
        <SoundButtons>
          <AddButton>+</AddButton>
        </SoundButtons>
        <SoundButtons className="last-td">
          <Points3Button
            simbolColor="#999AA7"
            className="options-button"
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onDownloadClick={handleDownloadClick}
            onButtonClick={handlePoints3ButtonClick}
            isButtonClick={is3PointsClicked}
          />
        </SoundButtons>
      </TableBodyRow>
      {isRightButtonClicked && rightClickPosition && isSelected && (
        <OptionsBoxDiv
          className="options-box-div"
          style={{
            position: "absolute",
            top: rightClickPosition.y - 102,
            left: rightClickPosition.x,
          }}
          ref={boxRef}
        >
          <BoxOption
            optionTextName="Excluir"
            className={"delete-div"}
            imgClassName={"delete-option-box-icon"}
            iconSrc={deleteIcon}
            iconAltName="Delete"
            onFunctionClick={handleDeleteClick}
          />
          <BoxOption
            optionTextName="Editar"
            className={"edit-div"}
            imgClassName={"edit-option-box-icon"}
            iconSrc={editIcon}
            iconAltName="Edit"
            onFunctionClick={handleEditClick}
          />
          <BoxOption
            optionTextName="Download"
            className={"edit-div"}
            imgClassName={"edit-option-box-icon"}
            iconSrc={editIcon}
            iconAltName="Download"
            onFunctionClick={handleDownloadClick}
          />
        </OptionsBoxDiv>
      )}
    </>
  );
}
