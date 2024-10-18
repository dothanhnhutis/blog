interface FetchApiRequestConfig<D = any> extends CreateFetchApiDefault {
  data?: D;
}

export interface FetchApiResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: FetchApiRequestConfig<D>;
}

export class FetchApiError<T = any, D = any> extends Error {
  code?: string;
  config?: FetchApiRequestConfig<D>;
  response?: FetchApiResponse<T, D>;

  constructor(
    message?: string,
    code?: string,
    config?: FetchApiRequestConfig<D>,
    response?: FetchApiResponse<T, D>
  ) {
    super(message);
    this.code = code;
    this.config = config;
    this.response = response;
    this.name = "FetchApiError";
  }

  toJSON(): object {
    return {
      name: this.name,
      code: this.code,
      config: this.config,
      stack: this.stack,
      response: this.response,
    };
  }
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
}

async function fetchApi<T = any, D = any>(
  method: string,
  url: string,
  config?: FetchApiRequestConfig<D>
): Promise<FetchApiResponse<T, D>> {
  let newConfig: any = {
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    ...config,
  };

  let { data, baseUrl, ...rest } = newConfig;

  const fullUrl: string = url.startsWith("/")
    ? baseUrl + url
    : baseUrl + "/" + url;

  let body: RequestInit["body"];

  if (data) {
    if (data instanceof FormData) {
      body = data;
    } else if (data instanceof URLSearchParams) {
      body = data;
      rest = {
        ...rest,
        headers: {
          ...rest.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
    } else if (data instanceof ArrayBuffer) {
      body = data;
      rest = {
        ...rest,
        headers: {
          ...rest.headers,
          "Content-Type": "application/octet-stream",
        },
      };
    } else if (data instanceof Blob) {
      body = data;
      rest = {
        ...rest,
        headers: {
          ...rest.headers,
          "Content-Type": "text/plain",
        },
      };
    } else if (typeof data == "string") {
      body = data;

      rest = {
        ...rest,
        headers: {
          ...rest.headers,
          "Content-Type": "text/plain",
        },
      };
    } else if (typeof data == "object") {
      body = JSON.stringify(data);
      rest = {
        ...rest,
        headers: {
          ...rest.headers,
          "Content-Type": "application/json",
        },
      };
    }
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      body,
      ...rest,
    });

    if (!response.ok) {
      const res = {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: { ...newConfig, ...rest },
      };

      throw new FetchApiError(
        `Request failed with status code ${response.status}`,
        FetchApiError.ERR_BAD_REQUEST,
        { ...newConfig, ...rest },
        res
      );
    }

    const data: T = await response.json();
    const result: FetchApiResponse<T, D> = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: { ...newConfig, ...rest },
    };

    return result;
  } catch (error: unknown) {
    if (error instanceof FetchApiError) {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new FetchApiError("Network error", FetchApiError.ERR_NETWORK, {
        ...newConfig,
        ...rest,
      });
    }
    throw error;
  }
}

class FetchApi {
  config?: CreateFetchApiDefault;
  constructor(config?: CreateFetchApiDefault) {
    this.config = config;
  }

  get<T = any, D = any>(url: string, config?: FetchApiRequestConfig<D>) {
    return fetchApi<T, D>("get", url, { ...this.config, ...config });
  }
  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: FetchApiRequestConfig<D>
  ) {
    return fetchApi<T, D>("post", url, { ...this.config, ...config, data });
  }
  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: FetchApiRequestConfig<D>
  ) {
    return fetchApi<T, D>("put", url, { ...this.config, ...config, data });
  }
  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: FetchApiRequestConfig<D>
  ) {
    return fetchApi<T, D>("patch", url, { ...this.config, ...config, data });
  }
  delete<T = any, D = any>(url: string, config?: FetchApiRequestConfig<D>) {
    return fetchApi<T, D>("delete", url, { ...this.config, ...config });
  }
}

export interface CreateFetchApiDefault
  extends Omit<RequestInit, "body" | "method"> {
  baseUrl?: string;
}

export const createFetchApi = (config?: CreateFetchApiDefault): FetchApi => {
  return new FetchApi(config);
};

export function isFetchApiError<T = any, D = any>(
  error: unknown
): error is FetchApiError<T, D> {
  return error instanceof FetchApiError;
}
