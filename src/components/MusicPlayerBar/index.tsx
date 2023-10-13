import { useContext, useEffect, useRef, useState } from "react";
import { ContextPlayer } from "../../utils/context-player";
import { Container, MusicPlayerBarContainer } from "./styles";
import LeftDiv from "../LeftDiv";
import CenterDiv from "../CenterDiv";
import RightDiv from "../RightDiv";

export default function MusicPlayerBar() {
  const {
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    setVolume,
    setDuration,
    src,
    setSrc,
  } = useContext(ContextPlayer);

  const [primeiraRenderizacao, setPrimeiraRenderizacao] = useState(true);
  const [primeiraRenderizacaoIsPlaying, setPrimeiraRenderizacaoIsPlaying] =
    useState(true);

  useEffect(() => {
    if (primeiraRenderizacaoIsPlaying) {
      setPrimeiraRenderizacaoIsPlaying(false);
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (primeiraRenderizacao) {
      setPrimeiraRenderizacao(false);
      setSrc("");
      return;
    }
    audioRef.current?.play();
    setIsPlaying(!isPlaying);
  }, [src]);

  useEffect(() => {
    if (src === "" || src === undefined) {
      setIsPlaying(false);
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      const isInputFocused = ["input", "textarea"].includes(
        (event.target as HTMLElement).tagName.toLowerCase()
      );
      const isVolumeInput = (event.target as HTMLElement).id === "volume-bar";
      const isMusicTimeInput =
        (event.target as HTMLElement).id === "music-time-bar";

      if (isInputFocused && !isVolumeInput && !isMusicTimeInput) {
        return; // Ignorar o evento
      }
      if (event.code === "Space") {
        event.preventDefault();
        if (audioRef.current?.paused) {
          audioRef.current?.play();
        } else {
          audioRef.current?.pause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  interface HTMLAudioElementWithVolume extends HTMLAudioElement {
    volume: number;
  }

  const audioRef = useRef<HTMLAudioElementWithVolume>(null);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleVolumeChange = () => {
    const audio = audioRef.current;
    if (audio) {
      setVolume(audio.volume);
    }
  };

  return (
    <Container>
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onVolumeChange={handleVolumeChange}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <MusicPlayerBarContainer>
        <LeftDiv />
        <CenterDiv audioRef={audioRef} />
        <RightDiv audioRef={audioRef} />
      </MusicPlayerBarContainer>
    </Container>
  );
}
