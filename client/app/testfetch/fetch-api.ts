interface FetchApiRequestConfig<D = any> extends CreateFetchApiDefault {
  data?: D;
}

interface FetchApiResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HeadersInit;
  config: FetchApiRequestConfig<D>;
}

async function fetchApi<T = any, R = FetchApiResponse<T>, D = any>(
  method: string,
  url: string,
  config?: FetchApiRequestConfig<D>
): Promise<R> {
  let newConfig: FetchApiRequestConfig<D> = {
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
    }

    const data: T = await response.json();
    const result: R = {
      //   data,
      //   status: response.status,
      //   statusText: response.statusText,
      //   headers: response.headers,
      //   config: { ...newConfig, ...rest },
    };

    return result;
  } catch (error: unknown) {
    if (error instanceof FetchApiError) {
      throw new Error("");
    }
    if (error instanceof TypeError) {
      throw new Error("");
    }
    throw new Error("");
  }
}

class FetchApi {
  config?: CreateFetchApiDefault;
  constructor(config?: CreateFetchApiDefault) {
    this.config = config;
  }

  get(url: string, config?: any) {
    return fetchApi("get", url, { ...this.config, ...config });
  }
}

interface CreateFetchApiDefault extends Omit<RequestInit, "body" | "method"> {
  baseUrl?: string;
}

const create = (config?: CreateFetchApiDefault): FetchApi => {
  return new FetchApi(config);
};
