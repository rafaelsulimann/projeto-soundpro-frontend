export type LoadingAudioDTO ={
    soundName: string;
    timeLeft: number;
    progressPercentage: number;
}

export type WebSocketLoadingFilesDTO = {
    requestId: string;
}