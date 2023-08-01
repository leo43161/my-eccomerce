import { configureStore } from "@reduxjs/toolkit";
import shopReducer from '../Features/shop/shopSlice'
import userReducer from '../Features/user/userSlice'
import cartReducer from '../Features/cart/cartSlice'
import ordersReducer from '../Features/orders/ordersSlice'
import { shopApi } from "../Services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../Services/authServices";

const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        ordersReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware)
})

setupListeners(store.dispatch)

export default store;