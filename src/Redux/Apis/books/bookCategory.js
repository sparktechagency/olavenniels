import baseApis from "../../baseApis";

const bookCategory = baseApis.injectEndpoints({
  endpoints: (build) => ({
    bookCategory: build.query({
      query: () => ({
        url: "/api/book-categories/get",
        method: "GET",
      }),
      providesTags: ["BookCategory"],
    }),
    singleBookCategory: build.query({
      query: (id) => ({
        url: `/api/book-categories/${id}`,
        method: "GET",
      }),
      providesTags: ["BookCategory"],
    }),
    addBookCategory: build.mutation({
      query: ({ data }) => ({
        url: "/api/book-categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BookCategory"],
    }),
    updateBookCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/book-categories/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BookCategory"],
    }),
    deleteBookCategory: build.mutation({
      query: (id) => ({
        url: `/api/book-categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BookCategory"],
    }),
  }),
});

export const {
  useBookCategoryQuery,
  useSingleBookCategoryQuery,
  useAddBookCategoryMutation,
  useUpdateBookCategoryMutation,
  useDeleteBookCategoryMutation,
} = bookCategory;
