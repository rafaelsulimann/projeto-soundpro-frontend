import { AxiosPromise } from "axios";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export enum UseType {
    INSERT,
    UPDATE
}

export type QueryParams = {
    page: number;
    name: string;
    size: number;
  };

export type PageReloadDTO<T> = {
  objects: T[];
  setObjects: Dispatch<SetStateAction<T[]>>;
  newObject: T;
  lastResponsePageContent: T[];
  setLastResponsePageContent: Dispatch<SetStateAction<T[]>>;
  isLastPageRef: MutableRefObject<boolean>;
  setIntersectionObserverCount: Dispatch<SetStateAction<number>>;
  findAllWithPageable: (name: string, page: number, size: number) => AxiosPromise<any>;
  useType: UseType;
  inputText: string;
  queryParams: QueryParams;
};


