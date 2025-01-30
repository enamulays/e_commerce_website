import { baseUrl } from "@/lib/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  
  endpoints: (builder) => ({
    //get login user api
    user: builder.query({
      query: () => ({
        url: "user/auth",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    //User logout api
    userLogout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    //Update user data api
    updateUser: builder.mutation({
      query: (updateData) => ({
        url: "user/update",
        method: "PUT",
        credentials: "include",
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  tagTypes: ["User"],
});

export const { useUserQuery, useUserLogoutMutation, useUpdateUserMutation } =
  userApi;
