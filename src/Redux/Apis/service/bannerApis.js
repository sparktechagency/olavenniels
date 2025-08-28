import baseApis from "../../baseApis";

const bannerApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    banner: build.query({
      query: () => ({
        url: "/banner/get",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
    addBanner: build.mutation({
      query: ({ data }) => ({
        url: "/banner/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/banner/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/banner/delete`,
        method: "DELETE",
        params: {
          id,
        },
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useBannerQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApis;
