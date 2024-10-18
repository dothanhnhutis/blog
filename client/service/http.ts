import configs from "@/config";
import { createFetchApi } from "./fetch-api";

export default createFetchApi({
  baseUrl: configs.NEXT_PUBLIC_SERVER_URL + "/api/v1",
  credentials: "include",
});
