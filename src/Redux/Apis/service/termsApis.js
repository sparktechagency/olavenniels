import baseApis from "../../baseApis";

const termsApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    terms: build.query({
      query: () => ({
        url: "/api/terms-and-conditions/get",
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),
    addTerms: build.mutation({
      query: (data) => ({
        url: "/api/terms-and-conditions/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    updateTerms: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/terms-and-conditions/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    deleteTerms: build.mutation({
      query: (id) => ({
        url: `/api/terms-and-conditions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const {
  useTermsQuery,
  useAddTermsMutation,
  useUpdateTermsMutation,
  useDeleteTermsMutation,
} = termsApis;
