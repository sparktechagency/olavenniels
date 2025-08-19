import baseApis from "../../baseApis";

const adminApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: ({ page }) => ({
        url: "/api/admin/get-all-admins",
        method: "GET",
        params: { page },
      }),
      providesTags: ["Admins"],
    }),
    createAdmin: build.mutation({
      query: ({ data }) => ({
        url: "/api/admin/register-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/update-admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: build.mutation({
      query: ({ id }) => ({
        url: `/api/admin/delete-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApis;
