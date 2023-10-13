import { useContext } from "react";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
    volume: number;
  }
  
  type Props = {
    handleIsVolumeBarHoveredMouseEnter: any;
    handleIsVolumeBarHoveredMouseLeave: any;
    isVolumeBarHovered: boolean;
    audioRef: React.RefObject<HTMLAudioElementWithVolume>;
  };

export default function VolumeBar({handleIsVolumeBarHoveredMouseEnter, handleIsVolumeBarHoveredMouseLeave, isVolumeBarHovered, audioRef}: Props){
    const { volume, setVolume } = useContext(ContextPlayer);

    const bgGradientVolume = isVolumeBarHovered
    ? `linear-gradient(to right, var(--orange-color) 0%, var(--orange-color) ${
        (volume * 100 < 90 && volume > 0) || volume * 100 > 90
          ? volume * 100
          : volume * 100 - 10
      }%, #2d2d33 0%, #2d2d33 100%)`
    : `linear-gradient(to right, #fff 0%, #fff ${
        (volume * 100 < 90 && volume > 0) || volume * 100 > 90
          ? volume * 100
          : volume * 100 - 10
      }%, #2d2d33 0%, #2d2d33 100%)`;

      const handleVolumeInput = (event: React.FormEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
          const target = event.target as HTMLInputElement;
          const value = parseFloat(target.value);
          audio.volume = value;
          setVolume(value);
        }
      };
      
    return(
        <Container>
            <input
              id="volume-bar"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeInput}
              onMouseEnter={handleIsVolumeBarHoveredMouseEnter}
              onMouseLeave={handleIsVolumeBarHoveredMouseLeave}
              style={{ background: bgGradientVolume }}
            />
        </Container>
    );
}