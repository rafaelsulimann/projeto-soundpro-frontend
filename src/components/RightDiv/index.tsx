import { useContext } from "react";
import EqualizerButton from "../Icons/Buttons/Equalizer";
import LikeButton from "../Icons/Buttons/Like";
import MicrofoneButton from "../Icons/Buttons/Microfone";
import PlaylistIcon from "../Icons/Playlist";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";
import Volume from "../Volume";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}

type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function RightDiv({ audioRef }: Props) {
  const { liked } = useContext(ContextPlayer);

  return (
    <Container>
      <MicrofoneButton
        simbolColor="#A2A3B1"
        divClassName="div-microfone-button"
        iconClassName="microfone-button"
      />
      <EqualizerButton
        simbolColor="#A2A3B1"
        divClassName="div-eq-button"
        iconClassName="eq-button"
      />
      <PlaylistIcon fill="#999AA7" className="user-playlist" />
      {liked ? (
        <LikeButton simbolColor="rgb(166, 54, 54)" className="like-button" />
      ) : (
        <LikeButton simbolColor="#999AA7" className="like-button" />
      )}
      <Volume audioRef={audioRef} />
    </Container>
  );
}
