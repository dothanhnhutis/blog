type FetchMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH";

interface CreateFetchDefaults extends Omit<RequestInit, "body"> {
  baseURL?: string;
}

interface FetchAPIRequestConfig<D = any> extends CreateFetchDefaults {
  url?: string;
  method?: FetchMethod | string;
  data?: D;
}

interface FetchAPIResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: FetchAPIRequestConfig<D>;
}

class FetchError<T = unknown, D = any> extends Error {
  config?: FetchAPIRequestConfig<D>;
  code?: string;
  request?: any;
  response?: FetchAPIResponse<T, D>;
  isAxiosError: boolean = true;
  constructor(
    message?: string,
    code?: string,
    config?: FetchAPIRequestConfig<D>,
    response?: FetchAPIResponse<T, D>
  ) {
    super(message);
    this.code = code;
    this.config = config;
    this.response = response;
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

const fetchAPI = async <T = any, R = FetchAPIResponse<T>, D = any>(
  method: FetchMethod | string,
  url: string,
  config?: FetchAPIRequestConfig<D>
): Promise<R> => {
  try {
    let body: BodyInit | null | undefined = undefined;

    if (config) {
      if (config.data) {
        if (
          typeof config.data == "string" ||
          config.data instanceof FormData ||
          config.data instanceof Blob ||
          config.data instanceof ArrayBuffer
        ) {
          body = config.data;
        }
        if (config.data == "object") {
          body = JSON.stringify(config.data);
        }
        delete config.data;
      }
    }

    const response = await fetch(url, {
      ...config,
      body,
      method,
    });

    if (!response.ok) {
      throw new Error("");
    }

    const data: T = await response.json();
    const result = {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: config || {},
    };

    return result as R;
  } catch (error: unknown) {
    throw new Error("");
  }
};

class FetchAPIInstance {
  config?: CreateFetchDefaults;

  constructor(config?: CreateFetchDefaults) {
    this.config = config;
  }

  get<T, R = FetchAPIResponse<T>, D = any>(
    url: string,
    config?: FetchAPIRequestConfig
  ) {
    return fetchAPI("get", url);
  }

  post<T, R = FetchAPIResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchAPIRequestConfig<D>
  ) {
    return fetchAPI("post", url);
  }
}

// const fetchDefault = new FetchAPI({

// });

// fetchDefault.post("/",)
