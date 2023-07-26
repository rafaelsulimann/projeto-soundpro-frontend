import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants";

export function requestBackend(config: AxiosRequestConfig, contextName: string) {
    const headers = {...config.headers};
  
    return axios({ ...config, baseURL: BASE_URL + contextName, headers });
  }