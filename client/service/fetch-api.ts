// interface FetchApiDefault extends Omit<RequestInit, "body"> {
//   baseUrl?: string;
// }

// interface FetchApiConfig<D = any> extends FetchApiDefault {
//   url?: string;
//   data?: D;
// }
// class FetchApiError<T = unknown, D = any> extends Error {
//   code?: string;
//   config?: FetchApiConfig<D>;
//   response?: FetchApiResponse<T, D>;
//   isFetchError: boolean = true;

//   constructor(
//     message?: string,
//     code?: string,
//     config?: FetchApiConfig,
//     response?: FetchApiResponse
//   ) {
//     super(message);
//     this.code = code;
//     this.config = config;
//     this.response = response;
//   }

//   static readonly ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
//   static readonly ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
//   static readonly ERR_BAD_OPTION = "ERR_BAD_OPTION";
//   static readonly ERR_NETWORK = "ERR_NETWORK";
//   static readonly ERR_DEPRECATED = "ERR_DEPRECATED";
//   static readonly ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
//   static readonly ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
//   static readonly ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
//   static readonly ERR_INVALID_URL = "ERR_INVALID_URL";
//   static readonly ERR_CANCELED = "ERR_CANCELED";
//   static readonly ECONNABORTED = "ECONNABORTED";
//   static readonly ETIMEDOUT = "ETIMEDOUT";
// }

// async function fetchApi(method: string, url?: string, config?: any) {
//   const fullUrl = url?.startsWith("/")
//     ? config?.baseUrl + url
//     : config?.baseUrl + "/" + url;

//   let newConfig: RequestInit | undefined;
//   if (config) {
//     const { baseUrl, data, url, ...rest } = config;
//     newConfig = rest;
//     if (data) {
//       if (
//         data instanceof FormData ||
//         data instanceof Blob ||
//         data instanceof ArrayBuffer ||
//         typeof data == "string"
//       ) {
//         newConfig.body = data;
//       } else if (typeof data == "object") {
//         newConfig.body = JSON.stringify(data);
//       }
//     }
//   }

//   try {
//     const response = await fetch(fullUrl, {
//       method,
//       ...newConfig,
//     });
//     const data = await response.json();
//     const res: FetchApiResponse<T, D> = {
//       data,
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       config: { ...config, ...newConfig },
//     };

//     if (!response.ok) {
//       throw new FetchApiError("", FetchApiError.ERR_BAD_REQUEST, config, res);
//     }

//     return res;
//   } catch (error: unknown) {
//     if (error instanceof FetchApiError) {
//     }
//     if (error instanceof TypeError) {
//     }
//   }
// }

// interface FetchApiResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: HeadersInit;
//   config: FetchApiConfig<D>;
// }

// interface FetchDefault extends Omit<RequestInit, "method" | "body"> {
//   baseUrl?: string;
// }

// class FetchApiInit {
//   config: FetchDefault;
//   constructor(config?: FetchDefault) {
//     this.config = {
//       headers: {
//         Accept: "application/json, text/plain, */*",
//       },
//       ...config,
//     };
//   }

//   get(url: string, config?: any) {
//     fetchApi("get", url, { ...this.config, ...config });
//   }
// }

// const http = new FetchApiInit({});
