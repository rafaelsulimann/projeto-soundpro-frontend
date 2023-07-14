import { useContext, useEffect, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import soundImg from "../../assets/capa-pack.png";
import PauseRowButton from "../Icons/Buttons/PauseRow";
import PlayRowButton from "../Icons/Buttons/PlayRow";
import LikeButton from "../Icons/Buttons/Like";
import Points3Button from "../Icons/Buttons/3Points";
import WaveIcon from "../Icons/Wave";
import * as soundService from "../../services/sound-service";
import "./styles.scss";
import MusicGifIcon from "../Icons/MusicGif";

type Props = {
  audio: AudioDTO;
  onDeleteAudioFile: any;
  onEditAudioFile: any;
  index: number;
};

export default function SoundSampleRow({
  audio,
  onDeleteAudioFile,
  onEditAudioFile,
  index
}: Props) {
  const { src, setSrc, isPlaying, setIsPlaying, setLiked } =
    useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");

  useEffect(() => {
    setBlobSrc(audio.audioUrl);
  }, []);

  function handleDeleteClick() {
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

  function handleUpdateSrc(newSrc: string, liked: boolean) {
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

  const bgSoundRowHoverColor = isHovered ? 'var(--line-gray-color)' : 'transparent';

  return (
    <tr
      className="sounds-samples-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: bgSoundRowHoverColor
      }}
    >
      <td className="play-pause-button first-td">
        {src === `${blobSrc}` ? (
          isPlaying ? (
            isHovered ? (
              <PauseRowButton
                simbolColor="var(--purple-color)"
                className="pause-button"
                blobSrc={blobSrc}
                liked={audio.liked}
                onClick={handleUpdateSrc}
              />
            ) : (
              <MusicGifIcon stroke="var(--purple-color)" className="music-gif" />
            )
          ) : (
            <PlayRowButton
              simbolColor="var(--purple-color)"
              className="play-button"
              blobSrc={blobSrc}
              liked={audio.liked}
              onClick={handleUpdateSrc}
            />
          )
        ) : isHovered && src !== `${audio?.audioUrl}` ? (
          <PlayRowButton
            simbolColor="var(--purple-color)"
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
            <LikeButton simbolColor="rgb(166, 54, 54)" className="like-button" />
          </div>
        ) : (
          <div className="like-button-div">
            <LikeButton simbolColor="var(--purple-color)" className="like-button" />
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
        />
      </td>
    </tr>
  );
}
