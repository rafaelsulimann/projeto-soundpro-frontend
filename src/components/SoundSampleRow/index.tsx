import { useContext, useEffect, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import soundImg from "../../assets/capa-pack.png";
import PauseRowButton from "../Icons/Buttons/PauseRow";
import PlayRowButton from "../Icons/Buttons/PlayRow";
import LikeButton from "../Icons/Buttons/Like";
import Points3Button from "../Icons/Buttons/3Points";
import WaveIcon from "../Icons/Wave";
import * as soundService from '../../services/sound-service'
import './styles.scss'

type Props = {
  audio: AudioDTO;
  onDeleteAudioFile: Function
};

export default function SoundSampleRow({ audio , onDeleteAudioFile}: Props) {
  const { src, setSrc, isPlaying, setIsPlaying, setLiked} = useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");

  useEffect(() => {
    setBlobSrc(audio.audioUrl);
  }, []);

  function handleDeleteClick(){
    soundService.deleteSoundById(audio.id)
    .then(() => {
      console.log(`Sound ${audio.name} deleted successfully`);
      onDeleteAudioFile();
    })
    .catch((error) => {
      console.log(error.data);
    })
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

  return (
    <div
      className="sounds-samples-row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sounds-samples-row-sound first-sound">
        <img className="sample-image" src={soundImg} alt="soundImg" />
        <div className="play-pause-button">
          {src === `${blobSrc}` ? (
            isPlaying ? (
              <PauseRowButton simbolColor="#fc9700" className="pause-button" blobSrc={blobSrc} liked={audio.liked} onClick={handleUpdateSrc}/>
            ) : (
              <PlayRowButton simbolColor="#fc9700" className="play-button" blobSrc={blobSrc} liked={audio.liked} onClick={handleUpdateSrc}/>
            )
          ) : isHovered && src !== `${audio?.audioUrl}` ? (
            <PlayRowButton simbolColor="#fc9700" className="play-button" blobSrc={blobSrc} liked={audio.liked} onClick={handleUpdateSrc}/>
          ) : (
            <WaveIcon simbolColor="#999AA7" className="wave-music-icon" />
          )}
        </div>

        <div className="sound-infos">
          <h3>{audio?.name}</h3>
        </div>
        <div className="sounds-samples-buttons">
        {audio.liked ? (
          <LikeButton simbolColor="rgb(166, 54, 54)" className="like-button" />
        ) : (
          <LikeButton simbolColor="#999AA7" className="like-button" />
        )}
          <h4>+</h4>
          <Points3Button simbolColor="#999AA7" className="options-button" onDeleteClick={handleDeleteClick}/>
        </div>
      </div>
    </div>
  );
}
