import { baseUrl } from "@/lib/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
  }),
});

export const { useAllProductsQuery, useSingleProductQuery } = productsApi;
