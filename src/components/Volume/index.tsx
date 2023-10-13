import { useState } from "react";
import VolumeButton from "../Icons/Buttons/Volume";
import VolumeBar from "../VolumeBar";
import { Container } from "./styles";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}

type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function Volume({ audioRef }: Props) {
  const [isVolumeBarHovered, setIsVolumeBarHovered] = useState(false);

  function handleIsVolumeBarHoveredMouseEnter() {
    setIsVolumeBarHovered(true);
  }

  function handleIsVolumeBarHoveredMouseLeave() {
    setIsVolumeBarHovered(false);
  }

  return (
    <Container>
      <VolumeButton
        simbolColor={isVolumeBarHovered ? "var(--orange-color)" : "#fff"}
        className="volume-button"
        onMouseEnter={handleIsVolumeBarHoveredMouseEnter}
        onMouseLeave={handleIsVolumeBarHoveredMouseLeave}
      />
      <VolumeBar handleIsVolumeBarHoveredMouseEnter={handleIsVolumeBarHoveredMouseEnter} handleIsVolumeBarHoveredMouseLeave={handleIsVolumeBarHoveredMouseLeave} isVolumeBarHovered={isVolumeBarHovered} audioRef={audioRef}/>
    </Container>
  );
}
