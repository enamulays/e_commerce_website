
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-website-backend-omega.vercel.app/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //get all products api
    allProducts: builder.query({
      query: () => ({
        url: "products",
        method: "GET",
      }),
    }),

    //get Single product by id
    singleProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),

    //Add or Remove from Wishlist
    wishlistAddDel: builder.mutation({
      query: (productId) => ({
        url: "products/wishlist",
        method: "POST",
        credentials: "include",
        body: { productId },
      }),
    }),
  }),
});

export const {
  useAllProductsQuery,
  useSingleProductQuery,
  useWishlistAddDelMutation,
} = productsApi;
