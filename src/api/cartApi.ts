import { baseUrl } from "@/lib/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    // Shopping cart add api
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "cart/add",
        method: "POST",
        credentials: "include",
        body: cartData,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
