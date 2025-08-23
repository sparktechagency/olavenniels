import baseApi from "../../baseApis";

const categoryApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/book-categories/get",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    singleCategory: build.query({
      query: (id) => ({
        url: `/book-categories/get/${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    createCategory: build.mutation({
      query: ({ data }) => ({
        url: "/book-categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/book-categories/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/book-categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApis;
