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

    //Update Cart Quantity
    updateQuantity: builder.mutation({
      query: ({ cartId, endPoints }) => ({
        url: endPoints,
        method: "POST",
        credentials: "include",
        body: { cartId },
      }),
    }),


    //Remove Cart Item
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: "cart/delete",
        method: "delete",
        credentials: "include",
        body: { cartId },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useDeleteCartMutation,
} = cartApi;
