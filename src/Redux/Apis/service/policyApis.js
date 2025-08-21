import baseApis from "../../baseApis";

const policyApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/api/manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: (description) => ({
        url: "/api/manage/add-privacy-policy",
        method: "POST",
        body: description,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  policyApis;
