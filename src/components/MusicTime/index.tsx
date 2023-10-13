import { useContext } from "react";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";
import CurrentMusicTime from "../CurrentMusicTime";
import MusicTimeBar from "../MusicTimeBar";
import MusicFullTime from "../MusicFullTime";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}
type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function MusicTime({ audioRef }: Props) {
  return (
    <Container>
      <CurrentMusicTime />
      <MusicTimeBar audioRef={audioRef} />
      <MusicFullTime />
    </Container>
  );
}
