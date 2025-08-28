import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "BookCategory",
    "AudioBook",
    "eBook",
    "Banner",
    "Faq",
    "Terms",
    "categories",
    "SubCategories",
    "Profile",
    "PrivacyPolicy",
    "Status",
  ],
  endpoints: () => ({}),
});

export default baseApis;
