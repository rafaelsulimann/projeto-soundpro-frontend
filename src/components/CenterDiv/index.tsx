import { useContext, useState } from "react";
import BackMusicButton from "../Icons/Buttons/BackMusic";
import NextMusicButton from "../Icons/Buttons/NextMusic";
import PlayMusicButton from "../Icons/Buttons/PlayMusic";
import RandomMusicButton from "../Icons/Buttons/RandomMusic";
import RepeatMusicButton from "../Icons/Buttons/RepeatMusic";
import StopMusicButton from "../Icons/Buttons/StopMusic";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";
import MusicButtons from "../MusicButtons";
import MusicTime from "../MusicTime";

interface HTMLAudioElementWithVolume extends HTMLAudioElement {
  volume: number;
}

type Props = {
  audioRef: React.RefObject<HTMLAudioElementWithVolume>;
};

export default function CenterDiv({ audioRef }: Props) {

  return (
    <Container>
      <MusicButtons audioRef={audioRef}/>
      <MusicTime audioRef={audioRef}/>
    </Container>
  );
}
