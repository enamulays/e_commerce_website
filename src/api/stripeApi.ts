import { baseUrl } from "@/lib/baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    paymentIntent: builder.mutation({
      query: (amount) => ({
        url: "stripe/create-payment-intent",
        credentials: "include",
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const { usePaymentIntentMutation } = stripeApi;
