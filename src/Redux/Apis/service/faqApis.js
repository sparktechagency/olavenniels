import baseApis from "../../baseApis";

const faqApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    faq: build.query({
      query: () => ({
        url: "/api/faq/get",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    addFaq: build.mutation({
      query: (data) => ({
        url: "/api/faq/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/faq/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `/api/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis;
