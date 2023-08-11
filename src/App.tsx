if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
  window.global = window;
}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeClient from "./routes/HomeClient";
import { useState } from "react";
import { ContextPlayer } from "./utils/context-player";
import Sounds from "./routes/HomeClient/Sounds";

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [duration, setDuration] = useState<number>(0);
  const [src, setSrc] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  
  return (
    <ContextPlayer.Provider
      value={{
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
        progress,
        setProgress,
        liked, 
        setLiked,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeClient />} >
            <Route path="sounds" element={<Sounds />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextPlayer.Provider>
  );
}
