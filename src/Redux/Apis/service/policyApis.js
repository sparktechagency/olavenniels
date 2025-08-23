import baseApis from "../../baseApis";

const policyApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: build.mutation({
      query: (description) => ({
        url: "/manage/add-privacy-policy",
        method: "POST",
        body: description,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  policyApis;
