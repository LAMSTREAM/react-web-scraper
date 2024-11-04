import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Define separate types for successful and error responses
interface ApiResponseSuccess<T> {
  data: T;
  error: null;
}

interface ApiResponseError {
  data: null;
  error: { message: string };
}

// Union type that represents either a successful or an error response
type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

interface ApiOptions {
  config: AxiosRequestConfig;
}

export const callExternalApi = async <T>(options: ApiOptions): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.request(options.config);
    const { data } = response;

    return {
      data,
      error: null,
    };
  } catch (error) {
    let message = "HTTP request failed";

    if (axios.isAxiosError(error)) {
      const axiosError = error;
      const { response } = axiosError;

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as any).message) {
        message = (response.data as any).message;
      }

      return {
        data: null,
        error: {
          message,
        },
      };
    }

    // Handle non-Axios errors
    return {
      data: null,
      error: {
        message: (error as Error).message,
      },
    };
  }
};
