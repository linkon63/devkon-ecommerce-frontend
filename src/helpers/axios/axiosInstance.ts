/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthKey } from "@/constants";
import { getNewAccessToken } from "@/services/actions/getNewAccessToken";
import { logOutUser } from "@/services/actions/logoutUser";
import setAccessTokenIntoCookie from "@/services/cookie/setAccessTokenIntoCookie";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/services/local-storage/local-storage";
import axios from "axios";

type TResponseObject = {
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: any | null;
  };
};

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(AuthKey.ACCESS_TOKEN);
    if (!!accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-expect-error
  function (response): TResponseObject {
    const responseObject = {
      data: response?.data,
    };
    return responseObject;
  },

  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 403 && !config.sent) {
      config["sent"] = true;
      const response = await getNewAccessToken();
      console.log({ response });
      if (response) {
        const accessToken = response?.data?.data?.accessToken;
        config.headers["Authorization"] = accessToken;
        setToLocalStorage(AuthKey.ACCESS_TOKEN, accessToken);
        setAccessTokenIntoCookie(accessToken);
      }

      return instance(config);
    } else if (error?.response?.status === 401) {
      logOutUser();
      const responseObject: TResponseObject = {
        data: {
          statusCode: error?.response?.data?.statusCode || 500,
          success: error?.response?.data?.success || false,
          message: error?.response?.data?.message || "You are unauthorized !!",
        },
      };
      return responseObject;
    } else {
      console.log({ error });
      const responseObject: TResponseObject = {
        data: {
          statusCode: error?.response?.data?.statusCode || 500,
          success: error?.response?.data?.success || false,
          message:
            error?.response?.data?.message ||
            "Something went wrong, Please try again !!! ",
        },
      };
      return responseObject;
    }
  }
);

export { instance };
