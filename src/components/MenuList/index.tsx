import AccountIcon from "../Icons/Account";
import AlbumsIcon from "../Icons/Albums";
import ArtistsIcon from "../Icons/Artists";
import FavoriteIcon from "../Icons/Favorite";
import HomeIcon from "../Icons/Home";
import MyMusicIcon from "../Icons/MyMusic";
import NewPlaylistIcon from "../Icons/NewPlaylist";
import PlaylistIcon from "../Icons/Playlist";
import SearchIcon from "../Icons/Search";
import SettingsIcon from "../Icons/Settings";
import Menu from "../Menu";
import { Container, Session } from "./styles";

export default function MenuList() {
  return (
    <Container>
      <Session>
        <h2>MENU</h2>
        <nav>
          <ul>
            <Menu to="/" icon={<HomeIcon fill="#999AA7" className="iconSvg" />} label="Home"/>
            <Menu to="/search" icon={<SearchIcon fill="#9696A3" className="iconSvg" />} label="Search"/>
            <Menu to="/albums" icon={<AlbumsIcon fill="#9696A3" className="iconSvg" />} label="Albums"/>
            <Menu to="/artists" icon={<ArtistsIcon fill="#9696A3" className="iconSvg" />} label="Artists"/>
          </ul>
        </nav>
      </Session>
      <Session>
        <h2>LIBRARY</h2>
        <nav>
          <ul>
            <Menu to="/favorites" icon={<FavoriteIcon fill="#999AA7" className="iconSvg" />} label="Favorite"/>
            {/* <Menu to="/popular" icon={<PopularIcon fill="#999AA7" className="iconSvg" />} label="Popular"/> */}
            <Menu to="/sounds" icon={<MyMusicIcon fill="#999AA7" className="iconSvg" />} label="My Music"/>
          </ul>
        </nav>
      </Session>
      <Session>
        <h2>CUSTOMIZE</h2>
        <nav>
          <ul>
            <Menu to="/new-playlist" icon={<NewPlaylistIcon fill="#999AA7" className="iconSvg" />} label="New Playlist"/>
            <Menu to="/" icon={<PlaylistIcon fill="#999AA7" className="iconSvg" />} label="Jazz"/>
            <Menu to="/" icon={<PlaylistIcon fill="#999AA7" className="iconSvg" />} label="The Beatles"/>
            <Menu to="/settings" icon={<SettingsIcon fill="#999AA7" className="iconSvg" />} label="Settings"/>
            <Menu to="/account" icon={<AccountIcon fill="#999AA7" className="iconSvg" />} label="Account"/>
          </ul>
        </nav>
      </Session>
    </Container>
  );
}
