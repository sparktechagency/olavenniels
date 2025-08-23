import baseApis from "../../baseApis";

const bothFormatBook = baseApis.injectEndpoints({
  endpoints: (build) => ({
    bothFormatBooks: build.query({
      query: ({ categoryName, search }) => ({
        url: "/books/get",
        method: "GET",
        params: {
          categoryName,
          search,
        },
      }),
      providesTags: ["eBook"],
    }),
    addBothFormatBook: build.mutation({
      query: ({ data }) => ({
        url: "/books/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    updateBothFormatBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/books/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    deleteBothFormatBook: build.mutation({
      query: ({ id }) => ({
        url: `/books/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["eBook"],
    }),
  }),
});

export const {
  useBothFormatBooksQuery,
  useAddBothFormatBookMutation,
  useUpdateBothFormatBookMutation,
  useDeleteBothFormatBookMutation,
} = bothFormatBook;
