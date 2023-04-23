import { createContext } from "react";

export type ContextPlayerType = {
    currentTime : number;
    setCurrentTime : (currentTime: number) => void;
    isPlaying: boolean;
    setIsPlaying : (isPlaying: boolean) => void;
    volume: number;
    setVolume : (volume: number) => void;
    duration: number;
    setDuration : (duration: number) => void;
    src : string;
    setSrc : (src : string) => void;
    progress : number;
    setProgress : (progress: number) => void;
    liked : boolean;
    setLiked : (liked : boolean) => void;

}

export const ContextPlayer = createContext<ContextPlayerType>({
    currentTime : 0,
    setCurrentTime : () => {},
    isPlaying: false,
    setIsPlaying : () => {},
    volume: 1,
    setVolume : () => {},
    duration: 0,
    setDuration : () => {},
    src : "",
    setSrc : () => {},
    progress : 0,
    setProgress : () => {},
    liked : false,
    setLiked : () => {},
})
