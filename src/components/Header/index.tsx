import "./styles.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-div-comp">
          <svg
            width="156"
            height="105"
            viewBox="0 0 156 105"
            fill="#999AA7"
            xmlns="http://www.w3.org/2000/svg"
            className="iconSvg homeImg"
          >
            <rect x="32" width="12" height="105" rx="6" className="rect"/>
            <rect x="112" width="12" height="105" rx="6" className="rect"/>
            <rect x="96" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="128" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="48" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="16" y="16" width="12" height="74" rx="6" className="rect"/>
            <rect x="80" y="24" width="12" height="58" rx="6" className="rect"/>
            <rect x="64" y="32" width="12" height="42" rx="6" className="rect"/>
            <rect y="32" width="12" height="42" rx="6" className="rect"/>
            <rect x="144" y="32" width="12" height="42" rx="6" className="rect"/>
          </svg>
          <h1>Sound Pro</h1>
        </div>
      </div>
      <div className="header-nav custom-scrollbar">
        <div className="header-nav-session">
          <h2>MENU</h2>
          <nav>
            <ul>
              <li className="header-div-comp">
                <svg
                  width="64"
                  height="66"
                  viewBox="0 0 64 66"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <path d="M20.5 66H4C1.79086 66 0 64.2091 0 62V23.6982C0 22.0142 0.847727 20.4433 2.25536 19.5189L30.1272 1.21494C32.1666 -0.124343 34.8139 -0.0953565 36.8234 1.28827L61.8355 18.5097C63.1906 19.4427 64 20.9827 64 22.6279V62C64 64.2091 62.2091 66 60 66H43.5C41.2909 66 39.5 64.2091 39.5 62V56V49C39.5 47.3431 38.1569 46 36.5 46H27.5C25.8431 46 24.5 47.3431 24.5 49V56V62C24.5 64.2091 22.7091 66 20.5 66Z" />
                </svg>
                Home
              </li>
              <li className="header-div-comp">
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="#9696A3"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <circle cx="35.5" cy="35.5" r="35.5" />
                  <path d="M65.6348 57.6933C66.0328 57.3104 66.6659 57.3226 67.0488 57.7206L81.2711 72.5027C83.5686 74.8906 83.4953 78.6889 81.1074 80.9864L80.4009 81.6661C78.013 83.9636 74.2147 83.8903 71.9172 81.5024L57.6949 66.7203C57.312 66.3223 57.3242 65.6893 57.7222 65.3064L65.6348 57.6933Z" />
                </svg>
                Search
              </li>
              <li className="header-div-comp">
                <svg
                  width="75"
                  height="74"
                  viewBox="0 0 75 74"
                  fill="#9696A3"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <rect y="33" width="75" height="41" rx="8" />
                  <rect x="8" y="22" width="59" height="7" rx="3" />
                  <rect x="16" y="11" width="42" height="7" rx="3" />
                  <rect x="26" width="23" height="7" rx="3" />
                </svg>
                Albums
              </li>
              <li className="header-div-comp">
                <svg
                  width="86"
                  height="70"
                  viewBox="0 0 86 70"
                  fill="#9696A3"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <path d="M25 40C25 33.9249 29.9249 29 36 29H50C56.0751 29 61 33.9249 61 40V66C61 68.2091 59.2091 70 57 70H29C26.7909 70 25 68.2091 25 66V40Z" />
                  <path d="M0 46.5C0 40.701 4.70101 36 10.5 36H19C20.1046 36 21 36.8954 21 38V68C21 69.1046 20.1046 70 19 70H10.5C4.70101 70 0 65.299 0 59.5V46.5Z" />
                  <path d="M86 46.5C86 40.701 81.299 36 75.5 36H67C65.8954 36 65 36.8954 65 38V68C65 69.1046 65.8954 70 67 70H75.5C81.299 70 86 65.299 86 59.5V46.5Z" />
                  <circle cx="42" cy="14" r="14" />
                  <circle cx="17" cy="23" r="11" />
                  <circle cx="67" cy="23" r="11" />
                </svg>
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
                <svg
                  width="82"
                  height="72"
                  viewBox="0 0 82 72"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <path d="M39.8052 10.7945C24.8398 -19.2109 -42.6276 17.2773 41.3406 71.7896C122.373 17.283 57.8374 -19.2129 39.8052 10.7945Z" />
                </svg>
                Favorite
              </li>
              <li className="header-div-comp">
                <svg
                  width="62"
                  height="85"
                  viewBox="0 0 62 85"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <path d="M27.6102 84.5C-14.5072 77.1728 0.86577 29.759 16.518 25.7128C17.1003 25.5623 17.6251 26.0652 17.6303 26.6667C17.9137 59.1169 30.0701 42.8894 26.6273 33.5C18.7784 12.0936 27.3176 3.15078 34.2219 0.640062C35.0697 0.331751 35.7674 1.34651 35.4539 2.19245C34.2584 5.41847 34.5473 9.59149 35.2499 13.0801C35.902 16.3181 38.2367 18.8449 41.0097 20.6395C83.5706 48.1825 52.1302 88.7657 27.6102 84.5Z" />
                </svg>
                Popular
              </li>
              <li className="header-div-comp">
                <svg
                  width="69"
                  height="69"
                  viewBox="0 0 69 69"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <rect width="69" height="69" rx="14" />
                  <rect
                    x="26"
                    y="13"
                    width="6"
                    height="43"
                    rx="2"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="48"
                    y="21"
                    width="6"
                    height="35"
                    rx="2"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="37"
                    y="35"
                    width="6"
                    height="21"
                    rx="2"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="15"
                    y="28"
                    width="6"
                    height="28"
                    rx="2"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                </svg>
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
                <svg
                  width="79"
                  height="65"
                  viewBox="0 0 79 65"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <path d="M0 13C0 5.8203 5.8203 0 13 0H32.342C34.8431 0 37.0818 1.55144 37.96 3.89326L39.895 9.05337C40.3341 10.2243 41.4535 11 42.704 11H47.125H57.75H70C74.9706 11 79 15.0294 79 20V56C79 60.9706 74.9706 65 70 65H9C4.02944 65 0 60.9706 0 56V13Z" />
                  <path d="M40 25V50" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="7" />
                  <path d="M27 38H52" stroke="rgba(0, 0, 0, 0.8)" strokeWidth="7" />
                </svg>
                New Playlist
              </li>
              <li className="header-div-comp">
                <svg
                  width="69"
                  height="69"
                  viewBox="0 0 69 69"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <rect width="69" height="69" rx="14" />
                  <rect
                    x="26"
                    y="16"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="31"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="45"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <circle cx="17" cy="50" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="35" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="20" r="5" fill="rgba(0, 0, 0, 0.8)" />
                </svg>
                Jazz
              </li>
              <li className="header-div-comp">
                <svg
                  width="69"
                  height="69"
                  viewBox="0 0 69 69"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <rect width="69" height="69" rx="14" />
                  <rect
                    x="26"
                    y="16"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="31"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="45"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <circle cx="17" cy="50" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="35" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="20" r="5" fill="rgba(0, 0, 0, 0.8)" />
                </svg>
                The Beatles
              </li>
              <li className="header-div-comp">
                <svg
                  width="69"
                  height="69"
                  viewBox="0 0 69 69"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <rect width="69" height="69" rx="14" />
                  <rect
                    x="26"
                    y="16"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="31"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <rect
                    x="26"
                    y="45"
                    width="31"
                    height="9"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.8)"
                  />
                  <circle cx="17" cy="50" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="35" r="5" fill="rgba(0, 0, 0, 0.8)" />
                  <circle cx="17" cy="20" r="5" fill="rgba(0, 0, 0, 0.8)" />
                </svg>
                Settings
              </li>
              <li className="header-div-comp">
                <svg
                  width="76"
                  height="81"
                  viewBox="0 0 76 81"
                  fill="#999AA7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="iconSvg"
                >
                  <circle cx="36" cy="22" r="22"  />
                  <path
                    d="M0 78.2432C0 60.9881 13.9881 47 31.2432 47H44.7568C62.0119 47 76 60.9881 76 78.2432V78.2432C76 79.7658 74.7658 81 73.2432 81H2.75676C1.23425 81 0 79.7658 0 78.2432V78.2432Z"
                  />
                </svg>
                Acount
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
