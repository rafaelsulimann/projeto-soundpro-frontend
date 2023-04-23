import { AxiosRequestConfig } from "axios";
import { SOUND_CONTEXT } from "../utils/constants";
import { requestBackend } from "../utils/requests";
import { TesteAudioDTO } from "../models/testeAudio";

const contextPath: string = SOUND_CONTEXT;

export function findAllRequest(page: number, size = 12, sort = "name,asc") {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/sounds",
    params: {
      page,
      name,
      size,
      sort,
    },
  };

  return requestBackend(config, contextPath);
}
export function insertRequest(sound: TesteAudioDTO) {
  
    console.log("sound request:", sound)
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/sounds",
    data: sound,
  };

  return requestBackend(config, contextPath);
}
