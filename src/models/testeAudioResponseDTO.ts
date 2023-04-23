import { CategoryDTO } from "./category";

export type TesteAudioResponseDTO ={
    id?: string;
    name: string;
    duration: number;
    categories: CategoryDTO[];
    audio: string;
}