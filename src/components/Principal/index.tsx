import Aside from "../Aside";
import Main from "../Main";
import { Container } from "./styles";

export default function Principal() {
  return (
    <>
      <Container>
        <Aside />
        <Main />
      </Container>
    </>
  );
}
