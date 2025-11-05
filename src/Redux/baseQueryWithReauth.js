import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/server";
import toast from "react-hot-toast";

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
    !result?.error ||
    (result.error.status !== 401 && result.error.status !== 403)
  ) {
    return result;
  }

  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      // window.location.href = "/auth/login";
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      localStorage.setItem("accessToken", refreshResult.data.accessToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // window.location.href = "/auth/login";
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.error(error?.data?.message || error?.message || 'your login session has ended, usually due to inactivity or a security measure')
    // window.location.href = "/auth/login";
  }

  return result;
};
