import { useContext } from "react";
import { Container } from "./styles";
import { ContextPlayer } from "../../utils/context-player";

export default function CurrentMusicTime() {
  const { currentTime } = useContext(ContextPlayer);

  return (
    <Container>
      <p>
        {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)
          .toString()
          .padStart(2, "0")}`}
      </p>
    </Container>
  );
}
