import { useContext, useEffect, useRef, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import soundImg from "../../assets/capa-pack.png";
import PauseRowButton from "../Icons/Buttons/PauseRow";
import PlayRowButton from "../Icons/Buttons/PlayRow";
import LikeButton from "../Icons/Buttons/Like";
import Points3Button from "../Icons/Buttons/3Points";
import * as soundService from "../../services/sound-service";
import "./styles.scss";
import MusicGifIcon from "../Icons/MusicGif";
import BoxOption from "../BoxOption";
import deleteIcon from "../../assets/delete-button.svg";
import editIcon from "../../assets/edit-button.svg";

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
  onRightButtonClick
}: Props) {
  const { src, setSrc, isPlaying, setIsPlaying, setLiked } =
    useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");
  const boxRef = useRef<HTMLDivElement>(null);
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [firstRenderScrollRowHoveredIdCount, setFirstRenderCount] = useState(0);
  const trRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    setBlobSrc(audio.audioUrl);
  }, []);

  useEffect(() => {
    if(firstRenderScrollRowHoveredIdCount === 0){
      setFirstRenderCount(1);
      return;
    } 
    if(scrollRowHoveredId === audio.id){
      if(!isHovered){
        setIsHovered(true);
      }
      return;
    } 
    if(isHovered){
      setIsHovered(false);
      return;
    }
  }, [scrollRowHoveredId]);

  useEffect(() => {
    if (isRightButtonClicked && boxRef.current) {
      // Adiciona event listener para o evento "click" no objeto window
      window.addEventListener("click", handleWindowClick);
    } else {
      // Remove event listener quando a box é fechada
      window.removeEventListener("click", handleWindowClick);
    }

    // Função que é chamada quando o evento "click" é acionado no objeto window
    function handleWindowClick(event: MouseEvent) {
      if (
        !boxRef.current?.contains(event.target as Node)
      ) {
        // Fecha a box se o elemento clicado não estiver dentro da box ou do botão
        onRightButtonClick(audio);
        setIsBoxOptionOpen(false);
      }
    }

    // Função que é chamada quando o componente é desmontado
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [isRightButtonClicked])

  function handleDeleteClick() {
    onRightButtonClick(audio);
    setIsBoxOptionOpen(false);
    soundService
      .deleteSoundById(audio.id)
      .then(() => {
        console.log(`Sound ${audio.name} deleted successfully`);
        onDeleteAudioFile(audio.id);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  function handleEditClick() {
    const originalName = audio.name;
    const soundName = "zatura";
    onRightButtonClick(audio);
    setIsBoxOptionOpen(false);
    soundService
      .updateSound(audio.id, { soundName: soundName, liked: audio.liked })
      .then((response) => {
        console.log("Response updateSound", response.data);
        console.log(`Sound ${originalName} updated to name teste`);
        const newUpdatedSound: AudioDTO = response.data;
        setBlobSrc(newUpdatedSound.audioUrl);
        onEditAudioFile(newUpdatedSound);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }

  function handleDownloadClick() {
    onRightButtonClick(audio);
    setIsBoxOptionOpen(false);
    soundService
      .downloadSound(audio.id)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const audioName = audio.name + ".mp3";
        link.href = url;
        link.setAttribute("download", audioName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Libera o objeto URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateSrc(event: any, newSrc: string, liked: boolean) {
    event.stopPropagation();
    if(is3PointsClicked){
      on3PointsClick(audio);
    }
    if (src === "" || src === undefined) {
      setSrc(newSrc);
      setLiked(liked);
    }
    if (src === newSrc) {
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setSrc(newSrc);
      setLiked(liked);
      if (isPlaying) {
        setIsPlaying(!isPlaying);
      }
    }
  }
  
  function handleRowClick() {
    if(isRightButtonClicked){
      onRightButtonClick(audio);
      setRightClickPosition({ x: 0, y: 0 });
      setIsBoxOptionOpen(false);
      onClick(audio);
    } else {
      if(isSelected){
        console.log("Entrou no if do is this sound selected")
        onRightButtonClick(audio);
        setRightClickPosition({ x: 0, y: 0 });
        setIsBoxOptionOpen(false);
        onClick(audio);
      } else {
        console.log("não entrou no if do is this sound selected")
        onRightButtonClick(audio);
        setRightClickPosition({ x: 0, y: 0 });
        setIsBoxOptionOpen(false);
        onClick(audio);
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
    if(!isSelected){
      onClick(audio);
    }
    if(is3PointsClicked){
      on3PointsClick(audio);
    }
    setRightClickPosition({ x: event.clientX, y: event.clientY });
    if(isRightButtonClicked){
      setIsBoxOptionOpen(true);
      return;
    }
    onRightButtonClick(audio);
    setIsBoxOptionOpen(true);
  }

  function handlePoints3ButtonClick(){
    if(!isSelected){
      onClick(audio);
    } 
    if(isRightButtonClicked){
      onRightButtonClick(audio);
    }
    on3PointsClick(audio);
    setIsBoxOptionOpen(!is3PointsClicked);
  }

  const bgSoundRowHoverColor = isHovered
    ? "var(--line-gray-color)"
    : "transparent";
  const bgSoundRowSelectedColor = isSelected
    ? "var(--gray-selected-color)"
    : "transparent";

  return (
    <>
      <tr
        id={"sounds-samples-row"}
        ref={trRef}
        data-id={audio.id}
        className="sounds-samples-row"
        onMouseEnter={handleRowMouseEnterHover}
        onMouseLeave={handleRowMouseLeaveHover}
        onClick={handleRowClick}
        onContextMenu={handleRightClick}
        style={{
          background: isSelected
            ? bgSoundRowSelectedColor
            : bgSoundRowHoverColor
        }}
      >
        <td className="play-pause-button first-td">
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
        </td>
        <td className="sound-infos">
          <div className="sound-infos-div">
            <img src={soundImg} alt="soundImg" />
            <h3>{audio?.name}</h3>
          </div>
        </td>
        <td className="sounds-samples-buttons">
          {audio.liked ? (
            <div className="like-button-div">
              <LikeButton
                simbolColor="rgb(166, 54, 54)"
                className="like-button"
              />
            </div>
          ) : (
            <div className="like-button-div">
              <LikeButton
                simbolColor="var(--orange-color)"
                className="like-button"
              />
            </div>
          )}
        </td>
        <td className="sounds-samples-buttons">
          <h4>+</h4>
        </td>
        <td className="sounds-samples-buttons last-td">
          <Points3Button
            simbolColor="#999AA7"
            className="options-button"
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onDownloadClick={handleDownloadClick}
            onButtonClick={handlePoints3ButtonClick}
            isButtonClick={is3PointsClicked}
          />
        </td>
      </tr>
      <div>
        {isRightButtonClicked && rightClickPosition && isSelected &&(
          <div
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
          </div>
        )}
      </div>
    </>
  );
}
