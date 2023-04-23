import { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { ContextPlayer } from "../../utils/context-player";
import audio from "../../assets/martin-garrix-limitiless.mp3";

export default function MusicPlayerBar() {
  const {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    duration,
    setDuration,
    src,
    setSrc,
    liked,
    setLiked,
  } = useContext(ContextPlayer);

  const [primeiraRenderizacao, setPrimeiraRenderizacao] = useState(true);
  const [primeiraRenderizacaoIsPlaying, setPrimeiraRenderizacaoIsPlaying] =
    useState(true);

  useEffect(() => {
    // Verifica se é a primeira renderização
    if (primeiraRenderizacaoIsPlaying) {
      setPrimeiraRenderizacaoIsPlaying(false); // Atualiza a variável auxiliar para false
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    // Realiza o processamento desejado
    console.log("O isPlaying foi alterado para", isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    // Verifica se é a primeira renderização
    if (primeiraRenderizacao) {
      setPrimeiraRenderizacao(false); // Atualiza a variável auxiliar para false]
      setSrc("");
      return; // Retorna sem fazer nada
    }
    audioRef.current?.play();
    setIsPlaying(!isPlaying);
    // Realiza o processamento desejado
    console.log("O src foi alterado para", src);
  }, [src]);

  useEffect(() => {
    if (src === "" || src === undefined) {
      setIsPlaying(false);
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // evita que a tecla role a página
        if (audioRef.current?.paused) {
          audioRef.current?.play();
        } else {
          audioRef.current?.pause();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function updateProgressPercentage() {
    const progressPercentage = (currentTime / duration) * 100;
    return progressPercentage;
  }

  const percentage = updateProgressPercentage();
  const bgGradientProgress = `linear-gradient(to right, #fc9700 0%, #fc9700 ${
    percentage < 70 && percentage > 0 ? percentage + 1 : percentage
  }%, #2d2d33 0%, #2d2d33 100%)`;
  const bgGradientVolume = `linear-gradient(to right, #fc9700 0%, #fc9700 ${
    (volume * 100 < 90 && volume > 0) || volume * 100 > 90
      ? volume * 100
      : volume * 100 - 10
  }%, #2d2d33 0%, #2d2d33 100%)`;

  interface HTMLAudioElementWithVolume extends HTMLAudioElement {
    volume: number;
  }

  const audioRef = useRef<HTMLAudioElementWithVolume>(null);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.valueAsNumber;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const togglePlay = () => {
    if (src === "" || src === undefined) {
      return;
    }
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = () => {
    const audio = audioRef.current;
    if (audio) {
      setVolume(audio.volume);
    }
  };

  const handleVolumeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const target = event.target as HTMLInputElement;
      const value = parseFloat(target.value);
      audio.volume = value;
      setVolume(value);
    }
  };

  const handleDownload = () => {
    const audio = audioRef.current;
    if (audio) {
      const link = document.createElement("a");
      link.href = audio.src;
      link.download = audio.src.split("/").pop() || "audio.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="music-play-container">
        <audio
          ref={audioRef}
          src={src}
          onLoadedMetadata={handleLoadedMetadata}
          onVolumeChange={handleVolumeChange}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="linha-branca"></div>
        <div className="music-player-bar-container">
          <div className="left-div">
            <div className="album-photo"></div>
            <svg
              width="56"
              height="45"
              viewBox="0 0 56 45"
              fill="none"
              stroke="var(--orange-color)"
              xmlns="http://www.w3.org/2000/svg"
              className="music-gif"
            >
              <path d="M3 20V43" strokeWidth="5" />
              <path d="M33 20V43" strokeWidth="5" />
              <path d="M23 24V43" strokeWidth="5" />
              <path d="M53 0V45" strokeWidth="5" />
              <path d="M43 7V43" strokeWidth="5" />
              <path d="M13 7V43" strokeWidth="5" />
            </svg>
          </div>
          <div className="center-div">
            <div className="music-buttons">
              <svg
                width="73"
                height="73"
                viewBox="0 0 73 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="random-button"
              >
                <circle cx="36.5" cy="36.5" r="36.5" fill="#60626C" />
                <path
                  d="M39.9091 44.1007C38.8045 44.1007 37.9091 44.9961 37.9091 46.1007C37.9091 47.2053 38.8045 48.1007 39.9091 48.1007V44.1007ZM29.9756 44.1007H27V48.1007H29.9756V44.1007ZM23 40.1007V29H19V40.1007H23ZM27 25H47V21H27V25ZM51 29V40.1007H55V29H51ZM47 44.1007H39.9091V48.1007H47V44.1007ZM51 40.1007C51 42.3098 49.2091 44.1007 47 44.1007V48.1007C51.4183 48.1007 55 44.519 55 40.1007H51ZM47 25C49.2091 25 51 26.7909 51 29H55C55 24.5817 51.4183 21 47 21V25ZM23 29C23 26.7909 24.7909 25 27 25V21C22.5817 21 19 24.5817 19 29H23ZM27 44.1007C24.7909 44.1007 23 42.3098 23 40.1007H19C19 44.519 22.5817 48.1007 27 48.1007V44.1007Z"
                  fill="#fff"
                />
                <path
                  d="M42.4561 40.8496L37.4375 45.6802C37.3977 45.7186 37.3966 45.7821 37.4351 45.8218L42.4561 50.9999"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                width="102"
                height="102"
                viewBox="0 0 102 102"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="back-music-button"
              >
                <circle
                  cx="51"
                  cy="51"
                  r="51"
                  transform="matrix(-1 0 0 1 102 0)"
                  fill="#60626C"
                />
                <g filter="url(#filter0_ii_816_169)">
                  <circle
                    cx="43.9073"
                    cy="43.9073"
                    r="43.9073"
                    transform="matrix(-1 0 0 1 94.5684 7.43164)"
                    fill="#60626C"
                  />
                </g>
                <path
                  d="M68 64.9193V37.362C68 35.6511 65.9912 34.73 64.6948 35.8466L47.8543 50.3504C46.8961 51.1756 46.9347 52.6719 47.9342 53.4466L64.7747 66.5C66.0889 67.5187 68 66.5821 68 64.9193Z"
                  fill="#1F1F24"
                />
                <rect
                  width="6"
                  height="33"
                  rx="2"
                  transform="matrix(-1 0 0 1 41 35)"
                  fill="#1F1F24"
                />
                <defs>
                  <filter
                    id="filter0_ii_816_169"
                    x="6.75391"
                    y="7.43164"
                    width="87.8145"
                    height="87.8145"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3.37748" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_816_169"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3.37748" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_816_169"
                      result="effect2_innerShadow_816_169"
                    />
                  </filter>
                </defs>
              </svg>
              {isPlaying ? (
                <svg
                  width="151"
                  height="151"
                  viewBox="0 0 151 151"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stop-button"
                  onClick={togglePlay}
                >
                  <circle cx="75.5" cy="75.5" r="75.5" fill="#60626C" />
                  <g filter="url(#filter0_ii_816_172)">
                    <circle cx="76" cy="76" r="65" fill="#60626C" />
                  </g>
                  <rect
                    x="58"
                    y="56"
                    width="12"
                    height="39"
                    rx="6"
                    fill="white"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <rect
                    x="82"
                    y="56"
                    width="12"
                    height="39"
                    rx="6"
                    fill="white"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <defs>
                    <filter
                      id="filter0_ii_816_172"
                      x="11"
                      y="11"
                      width="130"
                      height="130"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_816_172"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_innerShadow_816_172"
                        result="effect2_innerShadow_816_172"
                      />
                    </filter>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="151"
                  height="151"
                  viewBox="0 0 151 151"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  className="play-button"
                  onClick={togglePlay}
                >
                  <circle cx="75.5" cy="75.5" r="75.5" fill="#60626C" />
                  <g filter="url(#filter0_ii_818_182)">
                    <circle cx="76" cy="76" r="65" fill="#60626C" />
                  </g>
                  <path d="M59 97.506V52.0409C59 49.839 61.4159 48.4911 63.2897 49.6475L100.122 72.3801C101.903 73.479 101.903 76.0679 100.122 77.1668L63.2897 99.8994C61.4159 101.056 59 99.7079 59 97.506Z" />
                  <defs>
                    <filter
                      id="filter0_ii_818_182"
                      x="11"
                      y="11"
                      width="130"
                      height="130"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_818_182"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="5" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="effect1_innerShadow_818_182"
                        result="effect2_innerShadow_818_182"
                      />
                    </filter>
                  </defs>
                </svg>
              )}
              <svg
                width="102"
                height="102"
                viewBox="0 0 102 102"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="next-music-button"
              >
                <circle cx="51" cy="51" r="51" fill="#60626C" />
                <g filter="url(#filter0_ii_816_170)">
                  <circle
                    cx="51.3389"
                    cy="51.3389"
                    r="43.9073"
                    fill="#60626C"
                  />
                </g>
                <path
                  d="M34 64.9193V37.362C34 35.6511 36.0088 34.73 37.3052 35.8466L54.1457 50.3504C55.1039 51.1756 55.0653 52.6719 54.0658 53.4466L37.2253 66.5C35.9111 67.5187 34 66.5821 34 64.9193Z"
                  fill="#1F1F24"
                />
                <rect
                  x="61"
                  y="35"
                  width="6"
                  height="33"
                  rx="2"
                  fill="#1F1F24"
                />
                <defs>
                  <filter
                    id="filter0_ii_816_170"
                    x="7.43164"
                    y="7.43164"
                    width="87.8145"
                    height="87.8145"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3.37748" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.311111 0 0 0 0 0.317593 0 0 0 0 0.35 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_816_170"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="3.37748" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.309804 0 0 0 0 0.31634 0 0 0 0 0.34902 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_816_170"
                      result="effect2_innerShadow_816_170"
                    />
                  </filter>
                </defs>
              </svg>
              <svg
                width="73"
                height="73"
                viewBox="0 0 73 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="repeat-button"
              >
                <circle cx="36.5" cy="36.5" r="36.5" fill="#60626C" />
                <path
                  d="M44.8965 39.1523L50.7474 43.5088C50.8777 43.6059 50.885 43.7986 50.7623 43.9052L44.8965 49.0007"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M22 27.0312H23.6674C24.5461 27.0312 25.3807 27.4165 25.9506 28.0852L29.2492 31.9554"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M47.1777 44.0762H42.34C41.2841 44.0762 40.2711 43.6587 39.5218 42.9148L37.2577 40.6671"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M45.6523 24L50.766 27.9889C50.8869 28.0832 50.8976 28.2622 50.7888 28.3702L45.6523 33.4696"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M48.3261 28.5469H42.1491C40.984 28.5469 39.8768 29.0549 39.1169 29.9381L25.8677 45.3372C25.1078 46.2204 24.0006 46.7284 22.8355 46.7284H22"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="music-time">
              <div className="current-music-time">
                <p>{`${Math.floor(currentTime / 60)}:${Math.floor(
                  currentTime % 60
                )
                  .toString()
                  .padStart(2, "0")}`}</p>
              </div>
              <div className="music-time-bar">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleRangeChange}
                  style={{
                    background: bgGradientProgress,
                  }}
                />
              </div>
              <div className="music-full-time">
                <p>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}`}</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="right-div">
            <svg
              width="31"
              height="46"
              viewBox="0 0 31 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="microfone-button"
            >
              <path
                d="M6.01953 43.5H16.0195M26.0195 43.5H16.0195M16.0195 43.5V37.5"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <rect
                x="9.5"
                y="2"
                width="12"
                height="27"
                rx="6"
                stroke="#A2A3B1"
                strokeWidth="4"
              />
              <path
                d="M2 18C2.00896 42 29 42 29 18"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="eq-button"
            >
              <path
                d="M8 34.5V45.5"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M23 2V13"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M40 35V46"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M8 2V20.5"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M40 2V20.5"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M23 27V45.5"
                stroke="#A2A3B1"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <rect y="25" width="16" height="10" rx="5" fill="#A2A3B1" />
              <rect
                x="15"
                y="12"
                width="16"
                height="10"
                rx="5"
                fill="#A2A3B1"
              />
              <rect
                x="32"
                y="25"
                width="16"
                height="10"
                rx="5"
                fill="#A2A3B1"
              />
            </svg>
            <svg
              width="69"
              height="69"
              viewBox="0 0 69 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="user-playlist"
            >
              <rect width="69" height="69" rx="14" fill="#999AA7" />
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
            {liked ? (
              <svg
                width="82"
                height="72"
                viewBox="0 0 82 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="like-button"
              >
                <path
                  d="M39.8052 10.7945C24.8398 -19.2109 -42.6276 17.2773 41.3406 71.7896C122.373 17.283 57.8374 -19.2129 39.8052 10.7945Z"
                  fill="rgb(166, 54, 54)"
                />
              </svg>
            ) : (
              <svg
                width="82"
                height="72"
                viewBox="0 0 82 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="like-button"
              >
                <path
                  d="M39.8052 10.7945C24.8398 -19.2109 -42.6276 17.2773 41.3406 71.7896C122.373 17.283 57.8374 -19.2129 39.8052 10.7945Z"
                  fill="#999AA7"
                />
              </svg>
            )}
            <div className="volume-div">
              <svg
                width="28"
                height="33"
                viewBox="0 0 28 33"
                fill="#FC9700"
                stroke="#FC9700"
                xmlns="http://www.w3.org/2000/svg"
                className="volume-button"
              >
                <path
                  d="M23 12C27.6667 12 27.6667 21 23 21"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M2.5 10.9979H6.5L17.8904 2.23792C18.548 1.73215 19.5 2.20098 19.5 3.03061V29.9689C19.5 30.7986 18.5478 31.2674 17.8902 30.7614L6.5 21.9979H2.5C2.22386 21.9979 2 21.7741 2 21.4979V11.4979C2 11.2218 2.22386 10.9979 2.5 10.9979Z"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="volume-bar">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeInput}
                  style={{ background: bgGradientVolume }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
