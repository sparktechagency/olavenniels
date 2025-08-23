import baseApis from "../../baseApis";

const contactApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getContactData: build.query({
      query: () => ({
        url: "/manage/get-contact-us",
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
    updateContactData: build.mutation({
      query: (data) => ({
        url: "/manage/add-contact-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactDataQuery, useUpdateContactDataMutation } =
  contactApis;
