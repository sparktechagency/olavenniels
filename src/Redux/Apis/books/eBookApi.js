import baseApis from "../../baseApis";

const eBookApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    allBooks: build.query({
      query: ({ categoryName, search }) => ({
        url: "/ebooks/get",
        method: "GET",
        params: {
          categoryName,
          search,
        },
      }),
      providesTags: ["eBook"],
    }),
    getBookById: build.query({
      query: (id) => ({
        url: `/ebooks/get/${id}`,
        method: "GET",
      }),
      providesTags: ["eBook"],
    }),
    addEBook: build.mutation({
      query: ({ data }) => ({
        url: "/ebooks/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    updateEBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/ebooks/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    deleteEBook: build.mutation({
      query: ({ id }) => ({
        url: `/ebooks/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["eBook"],
    }),
  }),
});

export const {
  useAllBooksQuery,
  useGetBookByIdQuery,
  useAddEBookMutation,
  useUpdateEBookMutation,
  useDeleteEBookMutation,
} = eBookApi;
