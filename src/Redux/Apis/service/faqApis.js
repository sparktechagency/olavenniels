import baseApis from "../../baseApis";

const faqApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    faq: build.query({
      query: () => ({
        url: "/manage/get-faq",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    addFaq: build.mutation({
      query: (data) => ({
        url: "/manage/add-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: build.mutation({
      query: ({ id, data }) => ({
        url: `/manage/update-faq`,
        method: "PATCH",
        params: { faqId: id },
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `/manage/delete-faq`,
        method: "DELETE",
        params: { faqId: id },
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
