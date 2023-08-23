import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../../Data/products.json"
import allCategories from "../../Data/categories.json"

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            allProducts: allProducts,
            categories: allCategories,
            productSelected: {},
            categorySelected: {
                "id": 0,
                "title": "All",
                "icon": "mobile",
                "name": "all"
              },
            productsSelected: []
        }
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.value.productsSelected = state.value.allProducts.filter(product => product.category === action.payload.name)
            state.value.categorySelected = action.payload
        },
        setProductSelected: (state, action) => {
            state.value.productSelected = action.payload
        }
    }
});

export const { setCategorySelected, setProductSelected } = shopSlice.actions;
export default shopSlice.reducer;