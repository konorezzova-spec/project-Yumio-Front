import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  // baseURL: "https://project-yumio-back.onrender.com/api",
  withCredentials: true,
});
