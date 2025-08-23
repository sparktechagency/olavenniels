import baseApis from "../../baseApis";

const audioBookApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    allAudioBooks: build.query({
      query: ({ categoryName }) => ({
        url: "/audio-books/get",
        method: "GET",
        params: {
          categoryName,
        },
      }),
      providesTags: ["AudioBook"],
    }),
    getBookById: build.query({
      query: ({ id }) => ({
        url: `/audio-books/get/${id}`,
        method: "GET",
      }),
      providesTags: ["AudioBook"],
    }),
    addAudioBook: build.mutation({
      query: ({ data }) => ({
        url: "/audio-books/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AudioBook"],
    }),
    updateAudioBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/audio-books/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AudioBook"],
    }),
    deleteAudioBook: build.mutation({
      query: ({ id }) => ({
        url: `/audio-books/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AudioBook"],
    }),
  }),
});

export const {
  useAllAudioBooksQuery,
  useGetBookByIdQuery,
  useAddAudioBookMutation,
  useUpdateAudioBookMutation,
  useDeleteAudioBookMutation,
} = audioBookApi;
