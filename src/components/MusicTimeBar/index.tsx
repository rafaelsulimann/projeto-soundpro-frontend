import { useContext, useState } from "react";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}

type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function MusicTimeBar({ audioRef }: Props) {
  const { currentTime, duration } = useContext(ContextPlayer);

  const [isTimeBarHovered, setIsTimeBarHovered] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.valueAsNumber;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  function handleIsTimeBarHoveredMouseEnter() {
    setIsTimeBarHovered(true);
  }

  function handleIsTimeBarHoveredMouseLeave() {
    setIsTimeBarHovered(false);
  }

  function updateProgressPercentage() {
    const progressPercentage = (currentTime / duration) * 100;
    return progressPercentage;
  }

  const percentage = updateProgressPercentage();
  const bgGradientProgress = isTimeBarHovered
    ? `linear-gradient(to right, var(--orange-color) 0%, var(--orange-color) ${
        percentage < 70 && percentage > 0 ? percentage + 1 : percentage
      }%, #2d2d33 0%, #2d2d33 100%)`
    : `linear-gradient(to right, #fff 0%, #fff ${
        percentage < 70 && percentage > 0 ? percentage + 1 : percentage
      }%, #2d2d33 0%, #2d2d33 100%)`;

  return (
    <Container>
      <input
        id="music-time-bar"
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={handleRangeChange}
        onMouseEnter={handleIsTimeBarHoveredMouseEnter}
        onMouseLeave={handleIsTimeBarHoveredMouseLeave}
        style={{
          background: bgGradientProgress,
        }}
      />
    </Container>
  );
}
