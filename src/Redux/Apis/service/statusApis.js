import baseApis from "../../baseApis";

const statusApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    status: build.query({
      query: ({ search }) => ({
        url: "/user-management/get-all-users",
        method: "GET",
        params: {
          search: search,
        },
      }),
      providesTags: ["Status"],
    }),
    getUserGrowth: build.query({
      query: (year) => ({
        url: "/user-management/get-user-growth",
        method: "GET",
        params: {
          year,
        },
      }),
      providesTags: ["UserGrowth"],
    }),
    userBlock: build.mutation({
      query: ({ userID }) => ({
        url: `/user-management/block-user`,
        method: "PUT",
        params: {
          id: userID,
        },
      }),
      invalidatesTags: ["Status"],
    }),
    userUnblock: build.mutation({
      query: ({ userID }) => ({
        url: `/user-management/unblock-user`,
        method: "PUT",
        params: {
          id: userID,
        },
      }),
      invalidatesTags: ["Status"],
    }),
  }),
});
export const {
  useStatusQuery,
  useGetUserGrowthQuery,
  useUserBlockMutation,
  useUserUnblockMutation,
} = statusApis;
