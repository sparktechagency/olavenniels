import baseApis from "../../baseApis";

const eBookApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    allBooks: build.query({
      query: () => ({
        url: "/api/ebooks/get",
        method: "GET",
      }),
      providesTags: ["eBook"],
    }),
    getBookById: build.query({
      query: (id) => ({
        url: `/api/ebooks/get/${id}`,
        method: "GET",
      }),
      providesTags: ["eBook"],
    }),
    addEBook: build.mutation({
      query: (data) => ({
        url: "/api/ebooks/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    updateEBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/ebooks/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["eBook"],
    }),
    deleteEBook: build.mutation({
      query: (id) => ({
        url: `/api/ebooks/delete/${id}`,
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
