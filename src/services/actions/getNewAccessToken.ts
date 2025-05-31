import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      url: `http://localhost:5000/v1/auth/refresh-token`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null; // Return null or handle error as needed
  }
};
