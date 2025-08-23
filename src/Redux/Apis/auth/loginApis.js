import baseApis from "../../baseApis";

const loginApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "/admin/login-admin",
        method: "POST",
        body: data,
        invalidatesTags: ["Profile"],
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApis;
