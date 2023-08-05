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

export default function Aside() {
  return (
    <aside className="aside">
      <div className="aside-logo">
        <div className="aside-div-comp">
          <LogoIcon fill="#999AA7" className="iconSvg homeImg"/>
          <h1>Sound Pro</h1>
        </div>
      </div>
      <div className="aside-nav custom-scrollbar">
        <div className="aside-nav-session">
          <h2>MENU</h2>
          <nav>
            <ul>
              <li className="aside-div-comp">
                <HomeIcon fill="#999AA7" className="iconSvg"/>
                Home
              </li>
              <li className="aside-div-comp">
                <SearchIcon fill="#9696A3" className="iconSvg"/>
                Search
              </li>
              <li className="aside-div-comp">
                <AlbumsIcon fill="#9696A3" className="iconSvg"/>
                Albums
              </li>
              <li className="aside-div-comp">
                <ArtistsIcon fill="#9696A3" className="iconSvg"/>
                Artists
              </li>
            </ul>
          </nav>
        </div>
        <div className="aside-nav-session">
          <h2>LIBRARY</h2>
          <nav>
            <ul>
              <li className="aside-div-comp">
                <FavoriteIcon fill="#999AA7" className="iconSvg"/>
                Favorite
              </li>
              <li className="aside-div-comp">
                <PopularIcon fill="#999AA7" className="iconSvg"/>
                Popular
              </li>
              <li className="aside-div-comp">
                <MyMusicIcon fill="#999AA7" className="iconSvg"/>
                My Music
              </li>
            </ul>
          </nav>
        </div>
        <div className="aside-nav-session aside-nav-session-last">
          <h2>CUSTOMIZE</h2>
          <nav>
            <ul>
              <li className="aside-div-comp">
                <NewPlaylistIcon fill="#999AA7" className="iconSvg"/>
                New Playlist
              </li>
              <li className="aside-div-comp">
                <PlaylistIcon fill="#999AA7" className="iconSvg"/>
                Jazz
              </li>
              <li className="aside-div-comp">
                <PlaylistIcon fill="#999AA7" className="iconSvg"/>
                The Beatles
              </li>
              <li className="aside-div-comp">
                <SettingsIcon fill="#999AA7" className="iconSvg"/>
                Settings
              </li>
              <li className="aside-div-comp">
                <AccountIcon fill="#999AA7" className="iconSvg"/>
                Acount
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
