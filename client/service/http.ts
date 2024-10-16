import configs from "@/config";

export type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface ResponseData<T> {
  statusCode: number;
  headers: Headers;
  data: T;
}

export class ErrorResponse<T> extends Error {
  private headers: Headers;
  private statusCode: number;
  private data: T;

  constructor(props: ResponseData<T>) {
    super(
      typeof props.data == "string"
        ? props.data
        : typeof props.data == "object"
        ? props.data != null &&
          "message" in props.data &&
          typeof props.data.message == "string"
          ? props.data.message
          : ""
        : ""
    );
    this.headers = props.headers;
    this.statusCode = props.statusCode;
    this.data = props.data;
  }

  serialize(): ResponseData<T> {
    return {
      headers: this.headers,
      data: this.data,
      statusCode: this.statusCode,
    };
  }
}

async function fetchHttp<Success, Error>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: FetchHttpOption
) {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;

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
    const data: Error = await res.json();
    throw new ErrorResponse({
      headers: res.headers,
      statusCode: res.status,
      data,
    });
  }
  const data: Success = await res.json();
  return {
    statusCode: res.status,
    headers: res.headers,
    data,
  };
}

export const http = {
  get<S = any, E = any>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<S, E>("GET", url, options);
  },
  post<S = unknown, E = unknown>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return fetchHttp<S, E>("POST", url, { ...options, body });
  },
  patch<S, E>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<S, E>("PATCH", url, { ...options, body });
  },
  put<S, E>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<S, E>("PUT", url, { ...options, body });
  },
  delete<S, E>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<S, E>("DELETE", url, { ...options });
  },
};
