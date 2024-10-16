import configs from "@/config";

export type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export type FetchErrorData<T> = {
  statusCode: number;
  headers: Headers;
  data: T;
};

export class FetchError<T> extends Error {
  private headers: Headers;
  private statusCode: number;
  private data: T;

  constructor({ headers, statusCode, data }: FetchErrorData<T>) {
    super("");
    this.headers = headers;
    this.statusCode = statusCode;
    this.data = data;
  }

  serialize(): FetchErrorData<T> {
    return {
      headers: this.headers,
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}

async function fetchHttp<S, E>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: FetchHttpOption
) {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl =
    options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + "/api/v1";
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
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

  const data = (await res.json()) as S;
  return {
    statusCode: res.status,
    headers: res.headers,
    data,
  };
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
  async get<S = unknown, E = unknown>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return await fetchHttp<S, E>("GET", url, options);
  },
  async post<S = unknown, E = unknown>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return await fetchHttp<S, E>("POST", url, { ...options, body });
  },
  patch<S = unknown, E = unknown>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return fetchHttp<S, E>("PATCH", url, { ...options, body });
  },
  put<S = unknown, E = unknown>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return fetchHttp<S, E>("PUT", url, { ...options, body });
  },
  delete<S = unknown, E = unknown>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return fetchHttp<S, E>("DELETE", url, options);
  },
};
