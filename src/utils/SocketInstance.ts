import io from "socket.io-client";
import config from "../environments/config";

export const socket = io(config.API_BASE_URL, {
  query: { token: localStorage.getItem("accessToken") ?? "" },
});
