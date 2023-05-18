export type AudioDTO ={
    id: string;
    name: string;
    audioUrl: string;
    creationDate: string;
    lastUpdateDate: string;
    liked: boolean;
    soundType: string;
}

export type AudioUpdateDTO = {
    soundName: string;
    liked: boolean;
}
