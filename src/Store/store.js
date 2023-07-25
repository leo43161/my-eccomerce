import { configureStore } from "@reduxjs/toolkit";
import shopReducer from '../Features/shop/shopSlice'

export default configureStore({
    reducer: {
        shopReducer
    }
})