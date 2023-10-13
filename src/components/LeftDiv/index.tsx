import MusicGifIcon from "../Icons/MusicGif";
import { Container } from "./styles";

export default function LeftDiv(){
    return(
        <Container>
            <div className="album-photo"></div>
            <MusicGifIcon stroke="var(--orange-color)" className="music-gif" />
        </Container>
    );
}