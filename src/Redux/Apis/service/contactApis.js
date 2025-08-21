import baseApis from "../../baseApis";

const contactApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getContactData: build.query({
      query: () => ({
        url: "/api/manage/get-contact-us",
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
    updateContactData: build.mutation({
      query: (data) => ({
        url: "/api/manage/add-contact-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactDataQuery, useUpdateContactDataMutation } =
  contactApis;
