import { CategoryDTO } from "./category";

export type TesteAudioDTO ={
    id?: string;
    name: string;
    duration: number;
    categories: CategoryDTO[];
    audio: Blob;
}