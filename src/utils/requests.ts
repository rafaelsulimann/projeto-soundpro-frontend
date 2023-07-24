import axios, { AxiosRequestConfig } from "axios";

export function requestBackend(config: AxiosRequestConfig, contextName: string) {
    const headers = {...config.headers};
  
    return axios({ ...config, baseURL: process.env.BASE_URL + contextName, headers });
  }