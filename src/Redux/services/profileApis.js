import baseApis from "../baseApis";


const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query({
      query: () => ({
        url: "/api/admin/profile/get",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfileData: build.mutation({
      query: ({ data }) => ({
        url: "/api/admin/profile/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileDataMutation } =
  profileApis;
