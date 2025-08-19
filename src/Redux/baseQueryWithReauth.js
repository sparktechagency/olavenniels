import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/server";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    console.warn("Access token expired, trying refresh...");

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const refreshResult = await baseQuery(
        {
          url: "/api/admin/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newAccessToken = refreshResult.data.token;
        localStorage.setItem("accessToken", newAccessToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        throw new Error("Refresh token failed");
      }
    } catch (error) {
      console.error("Refresh failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth/login";
    }
  }

  return result;
};
