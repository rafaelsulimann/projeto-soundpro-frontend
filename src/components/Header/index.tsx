import AccountIcon from "../Icons/Account";
import AlbumsIcon from "../Icons/Albums";
import ArtistsIcon from "../Icons/Artists";
import FavoriteIcon from "../Icons/Favorite";
import HomeIcon from "../Icons/Home";
import LogoIcon from "../Icons/Logo";
import MyMusicIcon from "../Icons/MyMusic";
import NewPlaylistIcon from "../Icons/NewPlaylist";
import PlaylistIcon from "../Icons/Playlist";
import PopularIcon from "../Icons/Popular";
import SearchIcon from "../Icons/Search";
import SettingsIcon from "../Icons/Settings";
import "./styles.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-div-comp">
          <LogoIcon fill="#999AA7" className="iconSvg homeImg"/>
          <h1>Sound Pro</h1>
        </div>
      </div>
      <div className="header-nav custom-scrollbar">
        <div className="header-nav-session">
          <h2>MENU</h2>
          <nav>
            <ul>
              <li className="header-div-comp">
                <HomeIcon fill="#999AA7" className="iconSvg"/>
                Home
              </li>
              <li className="header-div-comp">
                <SearchIcon fill="#9696A3" className="iconSvg"/>
                Search
              </li>
              <li className="header-div-comp">
                <AlbumsIcon fill="#9696A3" className="iconSvg"/>
                Albums
              </li>
              <li className="header-div-comp">
                <ArtistsIcon fill="#9696A3" className="iconSvg"/>
                Artists
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-nav-session">
          <h2>LIBRARY</h2>
          <nav>
            <ul>
              <li className="header-div-comp">
                <FavoriteIcon fill="#999AA7" className="iconSvg"/>
                Favorite
              </li>
              <li className="header-div-comp">
                <PopularIcon fill="#999AA7" className="iconSvg"/>
                Popular
              </li>
              <li className="header-div-comp">
                <MyMusicIcon fill="#999AA7" className="iconSvg"/>
                My Music
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-nav-session header-nav-session-last">
          <h2>CUSTOMIZE</h2>
          <nav>
            <ul>
              <li className="header-div-comp">
                <NewPlaylistIcon fill="#999AA7" className="iconSvg"/>
                New Playlist
              </li>
              <li className="header-div-comp">
                <PlaylistIcon fill="#999AA7" className="iconSvg"/>
                Jazz
              </li>
              <li className="header-div-comp">
                <PlaylistIcon fill="#999AA7" className="iconSvg"/>
                The Beatles
              </li>
              <li className="header-div-comp">
                <SettingsIcon fill="#999AA7" className="iconSvg"/>
                Settings
              </li>
              <li className="header-div-comp">
                <AccountIcon fill="#999AA7" className="iconSvg"/>
                Acount
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
