import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/server";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "BookCategory",
    "AudioBook",
    "eBook",
    "Banner",
    "Faq",
    "Terms",
    "Categories",
    "SubCategories",
    "Profile",
  ],
  endpoints: () => ({}),
});

export default baseApis;
