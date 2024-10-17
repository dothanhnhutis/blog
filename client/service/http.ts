import configs from "@/config";

interface FetchRequestConfig<D = any> extends Omit<RequestInit, "body"> {
  baseUrl?: string;
  data?: D;
}

interface FetchResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: FetchRequestConfig<D>;
}

export class FetchError<T = unknown, D = any> extends Error {
  static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
  static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
  static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
  static readonly ERR_NETWORK = "ERR_NETWORK";
  static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
  static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
  static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
  static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
  static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
  static readonly ERR_CANCELED = "ERR_CANCELED";
  static readonly ECONNABORTED = "ECONNABORTED";
  static readonly ETIMEDOUT = "ETIMEDOUT";

  config?: FetchRequestConfig<D>;
  code?: string;
  status?: number;
  response?: FetchResponse<T, D>;

  constructor(
    message?: string,
    code?: string,
    config?: FetchRequestConfig<D>,
    response?: FetchResponse<T, D>
  ) {
    super(message);
    this.code = code;
    this.config = config;
    this.response = response;
  }
}

async function fetchHttp<T = any, R = FetchResponse<T>, D = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  config?: FetchRequestConfig<D>
) {
  let body: string | undefined;

  if (typeof config?.data == "string") {
    body = config.data;
  }

  if (config?.data && typeof config.data == "object") {
    body = JSON.stringify(config.data as D);
  }

  const baseHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const baseUrl = config?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + "/api/v1";

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const newConfig: FetchRequestConfig<D> = {
    ...config,
    headers: {
      ...baseHeaders,
      ...config?.headers,
    },
  };

  const res = await fetch(fullUrl, {
    ...newConfig,
    body,
    method,
  });

  if (!res.ok) {
    const data = (await res.json()) as T;
    const response: FetchResponse<T, D> = {
      data,
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      config: newConfig,
    };
    let message = "Something went wrong";
    if (typeof data == "string") message = data;
    if (
      data &&
      typeof data == "object" &&
      "message" in data &&
      typeof data.message == "string"
    ) {
      message = data.message;
    }
    throw new FetchError(message, `${res.status}`, config, response);
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
  async get<T = any, R = FetchResponse<T>, D = any>(
    url: string,
    config?: Omit<FetchRequestConfig<D>, "data">
  ) {
    return fetchHttp<T, R, D>("GET", url, config);
  },
  async post<T = any, R = FetchResponse<T>, D = any>(
    url: string,
    data: D,
    config?: FetchRequestConfig<D>
  ) {
    return fetchHttp<T, R, D>("POST", url, { ...config, data });
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
