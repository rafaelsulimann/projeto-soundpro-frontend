import { useContext, useEffect, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { AudioDTO } from "../../models/audio";
import likeImg from "../../assets/like.svg";
import pointsImg from "../../assets/3-points-options.svg";
import waveIcon from "../../assets/music-wave-icon.svg";
import { TesteAudioDTO } from "../../models/testeAudio";
import soundImg from "../../assets/capa-pack.png";
import { TesteAudioResponseDTO } from "../../models/testeAudioResponseDTO";
import { TesteAudioFirebaseDTO } from "../../models/testeAudioFirebaseDTO";

type Props = {
  audio: TesteAudioFirebaseDTO;
  onUpdateSrc: Function;
};

export default function SoundSampleRowTeste({ audio, onUpdateSrc }: Props) {
  const { src, isPlaying } = useContext(ContextPlayer);
  const [isHovered, setIsHovered] = useState(false);
  const [blobSrc, setBlobSrc] = useState<string>("");

  useEffect(() => {
    setBlobSrc(audio.audioUrl);
  }, []);

  //function convertBase64ToBlobSrc(): string {
  //  const base64String = audio.audio;
  //  const byteArray = atob(base64String)
  //    .split("")
  //    .map((char) => char.charCodeAt(0));
  //    const blob = new Blob([new Uint8Array(byteArray)], { type: "audio/mpeg" });
  //  return URL.createObjectURL(blob);
  //}

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
              <svg
                width="38"
                height="41"
                viewBox="0 0 38 41"
                fill="#fc9700"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleUpdateSrc(blobSrc, true)}
                className="pause-button"
              >
                <rect width="14" height="41" rx="7" />
                <rect x="24" width="14" height="41" rx="7" />
              </svg>
            ) : (
              <svg
                width="58"
                height="70"
                viewBox="0 0 58 70"
                fill="#fc9700"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleUpdateSrc(blobSrc, true)}
                className="play-button"
              >
                <path d="M0 66.7981V2.81699C0 0.615093 2.4159 -0.732909 4.2896 0.423591L56.122 32.414C57.903 33.5129 57.903 36.1018 56.122 37.2007L4.2897 69.1911C2.4159 70.3471 0 69.0001 0 66.7981Z" />
              </svg>
            )
          ) : isHovered && src !== `${audio?.audioUrl}` ? (
            <svg
              width="58"
              height="70"
              viewBox="0 0 58 70"
              fill="#fc9700"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleUpdateSrc(blobSrc, true)}
              className="play-button"
            >
              <path d="M0 66.7981V2.81699C0 0.615093 2.4159 -0.732909 4.2896 0.423591L56.122 32.414C57.903 33.5129 57.903 36.1018 56.122 37.2007L4.2897 69.1911C2.4159 70.3471 0 69.0001 0 66.7981Z" />
            </svg>
          ) : (
            <img
              className="sample-music-icon"
              src={waveIcon}
              alt={audio?.name}
            />
          )}
        </div>

        <div className="sound-infos">
          <h3>{audio?.name}</h3>
        </div>
        <div className="sounds-samples-buttons">
          <svg
            width="82"
            height="72"
            viewBox="0 0 82 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="like-button"
          >
            <path
              d="M39.8052 10.7945C24.8398 -19.2109 -42.6276 17.2773 41.3406 71.7896C122.373 17.283 57.8374 -19.2129 39.8052 10.7945Z"
              fill="#999AA7"
            />
          </svg>
          <h4>+</h4>
          <img className="options-button" src={pointsImg} alt="pointsImg" />
        </div>
      </div>
    </div>
  );
}
