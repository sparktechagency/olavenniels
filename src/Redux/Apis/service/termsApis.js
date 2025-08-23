import baseApis from "../../baseApis";

const termsApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    terms: build.query({
      query: () => ({
        url: "/manage/get-terms-conditions",
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),
    updateTerms: build.mutation({
      query: (description) => ({
        url: `/manage/add-terms-conditions`,
        method: "POST",
        body: description,
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const { useTermsQuery, useUpdateTermsMutation } = termsApis;
