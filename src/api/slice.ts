/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from "react";

import axios, { AxiosError, Method } from "axios";

type ResponseModel<T = unknown> = {
  meta: {
    error: {
      code: number;
      message: string;
    } | null;
    status: number;
  };
  data: T;
};

type RequestOptions = {
  auth?: boolean;
  headers?: Record<string, string>;
};

type UseApiError = { code: number; message: string };

type UseApi<T> = {
  reload: () => void;
  data: T | null;
  loading: boolean;
  error: UseApiError | null;
  success: boolean;
};

export default class ApiSlice {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
  static baseURL = process.env.HOST!;
  static defaultAuth = true;
  static async request<T = null>(
    url = "",
    method: Method = "GET",
    payload: Record<string, unknown> | FormData | null = null,
    options: RequestOptions | null = null
  ): Promise<ResponseModel<T>> {
    let headers: { Authorization?: string } = {};
    const token =
      typeof window === "undefined" ? "" : localStorage.getItem("token") || "";

    if (this.defaultAuth || options?.auth) {
      headers.Authorization = `Bearer ${token}`; // for most of requests;
    }

    // for most of requests;
    if (options?.headers) headers = { ...headers, ...options.headers };
    try {
      const rsp =
        (await axios({
          method,
          url: this.baseURL + url,
          headers,
          data: payload || {},
          responseType: "json",
        })) || {};
      return rsp.data;
    } catch (err) {
      const response = (err as AxiosError<ResponseModel<T>>).response!.data;
      return response;
    }
  }

  static async error(): Promise<ResponseModel<null>> {
    return {
      meta: {
        error: {
          code: -1,
          message: "error",
        },
        status: 400,
      },
      data: null,
    };
  }

  static useApi<T>(
    fetcher: () => Promise<ResponseModel<T>>,
    params?: unknown[]
  ): UseApi<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setUseApiError] = useState<UseApiError | null>(null);
    const getData = useCallback(async () => {
      const rsp = await fetcher();
      setLoading(false);
      if (!rsp.meta.error) {
        setData(rsp.data);
        if (error) setUseApiError(null);
      } else {
        if (data) setData(null);
        setUseApiError({
          code: rsp.meta.error.code,
          message: rsp.meta.error.message,
        });
      }
    }, [...(params || [])]);

    const reload = useCallback(() => getData(), [getData]);
    useEffect(() => {
      getData();
    }, [getData]);

    return {
      data,
      loading,
      success: Boolean(!loading && !error),
      error,
      reload,
    };
  }
}
