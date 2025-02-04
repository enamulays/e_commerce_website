import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { signupApi } from "@/api/signupApi";
import { loginApi } from "@/api/loginApi";
import { userApi } from "@/api/userApi";
import { cartApi } from "@/api/cartApi";
import { productsApi } from "@/api/productsApi";


export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    [signupApi.reducerPath]: signupApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(signupApi.middleware)
      .concat(loginApi.middleware)
      .concat(userApi.middleware)
      .concat(productsApi.middleware)
      .concat(cartApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
