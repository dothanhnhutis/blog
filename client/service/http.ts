import configs from "@/config";

interface FetchRequestConfig<I> extends Omit<RequestInit, "body"> {
  baseUrl?: string;
  data?: I;
}

interface FetchResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: FetchRequestConfig<T>;
}

export type FetchErrorData<T> = {
  statusCode: number;
  headers: Headers;
  data: T;
};

export class FetchError<T> extends Error {
  // private headers: Headers;
  // private statusCode: number;
  // private data: T;

  constructor(
    message?: string,
    code?: string,
    config?: FetchRequestConfig<T>,
    response?: FetchResponse<T, D>
  ) {
    super("");
    // this.headers = headers;
    // this.statusCode = statusCode;
    // this.data = data;
  }

  // serialize(): FetchErrorData<T> {
  //   return {
  //     headers: this.headers,
  //     statusCode: this.statusCode,
  //     data: this.data,
  //   };
  // }
}

async function fetchHttp<T = any, R = FetchResponse<T>, I = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  config?: FetchRequestConfig<T>
) {
  let body: string | undefined;
  if (typeof config?.data == "string") {
    body = config.data;
  }
  if (config?.data && typeof config.data == "object") {
    body = JSON.stringify(config.data as I);
  }
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl = config?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + "/api/v1";
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...config,
    headers: {
      ...baseHeaders,
      ...config?.headers,
    },
    body,
    method,
  });

  if (!res.ok) {
    const data = (await res.json()) as E;
    throw new FetchError({
      headers: res.headers,
      statusCode: res.status,
      data,
    });
  }

  const data = (await res.json()) as T;
  return {
    data,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    config: config,
  } as R;
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof FetchError) {
    message = "error.serialize().data";
  } else if (error instanceof TypeError) {
    message = error.message;
  } else if (
    error &&
    typeof error == "object" &&
    "message" in error &&
    typeof error.message == "string"
  ) {
    message = error.message;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export const http = {
  async get<T = any, R = AxiosResponse<T>, I = any>(
    url: string,
    config?: Omit<FetchRequestConfig<I>, "data">
  ) {
    return fetchHttp<T, R, I>("GET", url, config);
  },
  async post<T = any, R = AxiosResponse<T>, I = any>(
    url: string,
    data: T,
    config?: FetchRequestConfig<I>
  ) {
    return fetchHttp<T, R, I>("POST", url, { ...config, data });
  },
  // patch<S = unknown, E = unknown>(
  //   url: string,
  //   body: any,
  //   options?: FetchHttpOption
  // ) {
  //   return fetchHttp<S, E>("PATCH", url, { ...options, body });
  // },
  // put<S = unknown, E = unknown>(
  //   url: string,
  //   body: any,
  //   options?: FetchHttpOption
  // ) {
  //   return fetchHttp<S, E>("PUT", url, { ...options, body });
  // },
  // delete<S = unknown, E = unknown>(
  //   url: string,
  //   options?: Omit<FetchHttpOption, "body">
  // ) {
  //   return fetchHttp<S, E>("DELETE", url, options);
  // },
};
