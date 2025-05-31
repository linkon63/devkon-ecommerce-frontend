import { deleteCookie } from "../cookie/deleteCookie";
import { AuthKey } from "@/constants";
import { removeFromLocalStorage } from "../local-storage/local-storage";

export const logOutUser = () => {
  removeFromLocalStorage(AuthKey?.ACCESS_TOKEN);
  deleteCookie(AuthKey?.ACCESS_TOKEN);
  deleteCookie(AuthKey?.REFRESH_TOKEN);
};
