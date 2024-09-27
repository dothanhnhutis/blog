import configs from "@/config";

export type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface IError {
  success: false;
  data: { message: string };
}

export interface ISuccess<ResponseData> {
  success: true;
  headers: Headers;
  data: ResponseData;
}

export class FetchHttpError extends Error {
  private data: { message: string };
  constructor(props: IError) {
    super(props.data.message);
    this.data = props.data;
  }

  serialize(): IError {
    return {
      data: this.data,
      success: false,
    };
  }
}

export class FetchHttp {
  constructor(private _path: string) {}
  private async fetchHttp<ResponseData>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    options?: FetchHttpOption
  ) {
    const body = options?.body ? JSON.stringify(options?.body) : undefined;
    const baseHeaders = {
      "Content-Type": "application/json",
    };
    const baseUrl =
      options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + this._path;

    const fullUrl =
      url == ""
        ? baseUrl
        : url.startsWith("/")
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
        success: false,
        data: { message },
      });
    }
    const data: ResponseData = await res.json();
    const result: ISuccess<ResponseData> = {
      success: true,
      headers: res.headers,
      data,
    };
    return result;
  }

  protected get<ResponseData>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return this.fetchHttp<ResponseData>("GET", url, options);
  }

  protected post<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("POST", url, { ...options, body });
  }
  protected patch<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("PATCH", url, { ...options, body });
  }
  protected put<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("PUT", url, { ...options, body });
  }
  protected delete<ResponseData>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return this.fetchHttp<ResponseData>("DELETE", url, { ...options });
  }
}
