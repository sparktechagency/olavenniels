import baseApis from "../../baseApis";

const policyApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/api/privacy/get",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: ({data}) => ({
        url: "/api/privacy/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  policyApis;
