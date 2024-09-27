import configs from "@/config";

type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface IError {
  statusCode: number;
  headers: Headers;
  data: { message: string };
}

export class FetchHttpError extends Error {
  private headers: Headers;
  private statusCode: number;
  private data: { message: string };
  constructor(props: IError) {
    super(props.data.message);
    this.headers = props.headers;
    this.statusCode = props.statusCode;
    this.data = props.data;
  }

  serialize(): IError {
    return {
      headers: this.headers,
      data: this.data,
      statusCode: this.statusCode,
    };
  }
}

async function fetchHttp<ResponseData>(
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
    const { message }: { message: string } = await res.json();
    throw new FetchHttpError({
      headers: res.headers,
      statusCode: res.status,
      data: { message },
    });
  }
  const data: ResponseData = await res.json();
  return {
    statusCode: res.status,
    headers: res.headers,
    data,
  };
}

export const http = {
  get<ResponseData>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<ResponseData>("GET", url, options);
  },
  post<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("POST", url, { ...options, body });
  },
  patch<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("PATCH", url, { ...options, body });
  },
  put<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("PUT", url, { ...options, body });
  },
  delete<ResponseData>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<ResponseData>("DELETE", url, { ...options });
  },
};
