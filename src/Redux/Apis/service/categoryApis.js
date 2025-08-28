import baseApi from "../../baseApis";

const categoryApis = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: ({ search }) => ({
        url: "/book-categories/get",
        method: "GET",
        params: {
          search,
        },
      }),
      providesTags: ["categories"],
    }),
    singleCategory: build.query({
      query: (id) => ({
        url: `/book-categories/get/${id}`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    createCategory: build.mutation({
      query: ({ data }) => ({
        url: "/book-categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/book-categories/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/book-categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
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
