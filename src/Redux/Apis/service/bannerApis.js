import baseApis from "../../baseApis";

const bannerApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    banner: build.query({
      query: () => ({
        url: "/api/banner/get",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
    addBanner: build.mutation({
      query: ({data}) => ({
        url: "/api/banner/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/banner/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/api/banner/delete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
