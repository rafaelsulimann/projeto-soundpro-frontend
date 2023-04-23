import { CategoryDTO } from "./category";

export type AudioDTO ={
    id: string;
    image: string;
    src: string;
    name: string;
    categories: CategoryDTO[];
    liked: boolean;
}

