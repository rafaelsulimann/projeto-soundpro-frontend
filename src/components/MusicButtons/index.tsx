import { useContext } from "react";
import BackMusicButton from "../Icons/Buttons/BackMusic";
import NextMusicButton from "../Icons/Buttons/NextMusic";
import PlayMusicButton from "../Icons/Buttons/PlayMusic";
import RandomMusicButton from "../Icons/Buttons/RandomMusic";
import RepeatMusicButton from "../Icons/Buttons/RepeatMusic";
import StopMusicButton from "../Icons/Buttons/StopMusic";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}
type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function MusicButtons({ audioRef }: Props) {
  const { isPlaying, src, setIsPlaying } =
    useContext(ContextPlayer);

  const togglePlay = () => {
    if (src === "" || src === undefined) {
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <Container>
      <RepeatMusicButton
        backgroundColor="#60626C"
        simbolColor="#fff"
        divClassName="div-repeat-button"
        iconClassName="repeat-button"
      />
      <BackMusicButton
        backgroundColor="#60626C"
        simbolColor="#1F1F24"
        divClassName="div-back-music-button"
        iconClassName="back-music-button"
      />
      {isPlaying ? (
        <StopMusicButton
          backgroundColor="#60626C"
          simbolColor="#fff"
          divClassName="div-play-pause-button"
          iconClassName="stop-button"
          onClick={togglePlay}
        />
      ) : (
        <PlayMusicButton
          backgroundColor="#60626C"
          simbolColor="#fff"
          divClassName="div-play-pause-button"
          iconClassName="play-button"
          onClick={togglePlay}
        />
      )}
      <NextMusicButton
        backgroundColor="#60626C"
        simbolColor="#1F1F24"
        divClassName="div-next-music-button"
        iconClassName="next-music-button"
      />
      <RandomMusicButton
        backgroundColor="#60626C"
        simbolColor="#fff"
        divClassName="div-random-button"
        iconClassName="random-button"
      />
    </Container>
  );
}
