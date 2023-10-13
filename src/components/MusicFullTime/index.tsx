import { useContext } from "react";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";

export default function MusicFullTime() {
  const { duration } = useContext(ContextPlayer);

  return (
    <Container>
      <p>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)
        .toString()
        .padStart(2, "0")}`}</p>
    </Container>
  );
}
