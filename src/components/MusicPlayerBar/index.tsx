import { useContext, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { ContextPlayer } from "../../utils/context-player";
import MusicGifIcon from "../../components/Icons/MusicGif";
import BackMusicButton from "../../components/Icons/Buttons/BackMusic";
import RandomMusicButton from "../../components/Icons/Buttons/RandomMusic";
import StopMusicButton from "../../components/Icons/Buttons/StopMusic";
import PlayMusicButton from "../../components/Icons/Buttons/PlayMusic";
import NextMusicButton from "../../components/Icons/Buttons/NextMusic";
import RepeatMusicButton from "../../components/Icons/Buttons/RepeatMusic";
import MicrofoneButton from "../../components/Icons/Buttons/Microfone";
import EqualizerButton from "../../components/Icons/Buttons/Equalizer";
import PlaylistIcon from "../../components/Icons/Playlist";
import LikeButton from "../../components/Icons/Buttons/Like";
import VolumeButton from "../../components/Icons/Buttons/Volume";

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
  const [primeiraRenderizacaoIsPlaying, setPrimeiraRenderizacaoIsPlaying] = useState(true);

  useEffect(() => {
    if (primeiraRenderizacaoIsPlaying) {
      setPrimeiraRenderizacaoIsPlaying(false);
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
  }, [isPlaying]);

  useEffect(() => {
    if (primeiraRenderizacao) {
      setPrimeiraRenderizacao(false);
      setSrc("");
      return; 
    }
    audioRef.current?.play();
    setIsPlaying(!isPlaying);
  }, [src]);

  useEffect(() => {
    if (src === "" || src === undefined) {
      setIsPlaying(false);
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); 
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
            <MusicGifIcon stroke="var(--orange-color)" className="music-gif" />
          </div>
          <div className="center-div">
            <div className="music-buttons">
              <RandomMusicButton backgroundColor="#60626C" simbolColor="#fff" className="random-button"/>
              <BackMusicButton backgroundColor="#60626C" simbolColor="#1F1F24" className="back-music-button"/>
              {isPlaying ? (
                <StopMusicButton backgroundColor="#60626C" simbolColor="#fff" className="stop-button" onClick={togglePlay}/>
              ) : (
                <PlayMusicButton backgroundColor="#60626C" simbolColor="#fff" className="play-button" onClick={togglePlay}/>
              )}
              <NextMusicButton backgroundColor="#60626C" simbolColor="#1F1F24" className="next-music-button"/>
              <RepeatMusicButton backgroundColor="#60626C" simbolColor="#fff" className="repeat-button" />
            </div>
            <div className="music-time">
              <div className="current-music-time">
                <p>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, "0")}`}</p>
              </div>
              <div className="music-time-bar">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="1.5"
                  value={currentTime}
                  onChange={handleRangeChange}
                  style={{
                    background: bgGradientProgress,
                  }}
                />
              </div>
              <div className="music-full-time">
                <p>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="right-div">
            <MicrofoneButton simbolColor="#A2A3B1" className="microfone-button" />
            <EqualizerButton simbolColor="#A2A3B1" className="eq-button" />
            <PlaylistIcon fill="#999AA7" className="user-playlist" />
            {liked ? (
              <LikeButton simbolColor="rgb(166, 54, 54)" className="like-button" />
            ) : (
              <LikeButton simbolColor="#999AA7" className="like-button" />
            )}
            <div className="volume-div">
              <VolumeButton simbolColor="#FC9700" className="volume-button" />
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
