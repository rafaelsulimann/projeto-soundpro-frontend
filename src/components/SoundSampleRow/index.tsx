import { useContext, useEffect, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import soundImg from "../../assets/capa-pack.png";
import PauseRowButton from "../Icons/Buttons/PauseRow";
import PlayRowButton from "../Icons/Buttons/PlayRow";
import LikeButton from "../Icons/Buttons/Like";
import Points3Button from "../Icons/Buttons/3Points";
import WaveIcon from "../Icons/Wave";

type Props = {
  audio: AudioDTO;
  onUpdateSrc: Function;
};

export default function SoundSampleRow({ audio, onUpdateSrc }: Props) {
  const { src, isPlaying } = useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");

  useEffect(() => {
    setBlobSrc(audio.audioUrl);
  }, []);

  function handleUpdateSrc(newSrc: string, liked: boolean) {
    onUpdateSrc(newSrc, liked);
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
              <PauseRowButton simbolColor="#fc9700" className="pause-button" blobSrc={blobSrc} liked={true} onClick={handleUpdateSrc}/>
            ) : (
              <PlayRowButton simbolColor="#fc9700" className="play-button" blobSrc={blobSrc} liked={true} onClick={handleUpdateSrc}/>
            )
          ) : isHovered && src !== `${audio?.audioUrl}` ? (
            <PlayRowButton simbolColor="#fc9700" className="play-button" blobSrc={blobSrc} liked={true} onClick={handleUpdateSrc}/>
          ) : (
            <WaveIcon simbolColor="#999AA7" className="sample-music-icon" />
          )}
        </div>

        <div className="sound-infos">
          <h3>{audio?.name}</h3>
        </div>
        <div className="sounds-samples-buttons">
          <LikeButton simbolColor="#999AA7" className="like-button" />
          <h4>+</h4>
          <Points3Button simbolColor="#999AA7" className="options-button" />
        </div>
      </div>
    </div>
  );
}
