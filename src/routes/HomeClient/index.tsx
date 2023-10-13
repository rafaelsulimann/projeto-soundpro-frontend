import MusicPlayerBar from "../../components/MusicPlayerBar";
import Principal from "../../components/Principal";
import GlobalStyle from "../../styles/GlobalStyle";
import { Container } from "./styles";

export default function HomeClient() {
  return (
    <>
      <Container>
        <GlobalStyle />
        <Principal/>
      </Container>
        <MusicPlayerBar />
    </>
  );
}
