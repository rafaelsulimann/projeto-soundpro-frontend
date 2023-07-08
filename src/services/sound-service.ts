import { AxiosRequestConfig } from "axios";
import { SOUND_CONTEXT } from "../utils/constants";
import { requestBackend } from "../utils/requests";
import { AudioDTO, AudioUpdateDTO } from "../models/audio";

const contextPath: string = SOUND_CONTEXT;

export function findAllSounds(searchText: string, page: number, size: number, sort: string) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/sounds",
    params: {
      searchText,
      page,
      size,
      sort,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return requestBackend(config, contextPath);
}
export function insertSound(sound: FormData) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/sounds",
    data: sound,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return requestBackend(config, contextPath);
}

export function deleteSoundById(soundId: string) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/sounds/${soundId}`,
  };
  return requestBackend(config, contextPath);
}

export function updateSound(soundId: string, audio: AudioUpdateDTO){
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/sounds/${soundId}`,
    data: audio
  };
  return requestBackend(config, contextPath);
}

export function downloadSound(soundId: string){
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/sounds/download/${soundId}`,
    responseType: 'blob'
  };
  return requestBackend(config, contextPath);
}
