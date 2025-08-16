import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/server";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `${localStorage.getItem("accessToken")}`,
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
