import { configureStore } from "@reduxjs/toolkit";
import shopReducer from '../Features/shop/shopSlice'
import cartReducer from '../Features/cart/cartSlice'
import ordersReducer from '../Features/orders/ordersSlice'
import { shopApi } from "../Services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        ordersReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)

export default store;