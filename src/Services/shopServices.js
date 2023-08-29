import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { realtime_database_url } from '../DataBase/firebaseConfig'

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: realtime_database_url }),
    endpoints: (builder) => ({

        getCategoriesWithProducts: builder.query({
            query: () => 'categories.json',
            transformResponse: async (response) => {
                const categories = Object.values(response);
                const productsResponse = await fetch(`${realtime_database_url}/products.json`);
                const productsData = await productsResponse.json();

                const categoriesWithMatchingProducts = categories.reduce((accumulator, category) => {
                    const matchingProducts = Object.values(productsData).filter(product => product.category === category.name);
                    if (matchingProducts.length > 0) {
                        accumulator.push({
                            id: category.id,
                            category: category.name,
                            title: category.title,
                            products: matchingProducts.slice(0, 2)
                        });
                    }
                    return accumulator;
                }, []);

                return categoriesWithMatchingProducts;
            },
        }),

        getCategories: builder.query({
            query: () => 'categories.json'
        }),
        getProducts: builder.query({
            query: () => 'products.json'
        }),
        getOrders: builder.query({
            query: (localId) => `orders/${localId}.json`,
            transformResponse: (response) => {
                const ordersTransformed = Object.values(response);
                return ordersTransformed
            }
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const productsTransformed = Object.values(response);
                return productsTransformed
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const productTransformed = Object.values(response).pop()
                return (productTransformed)
            }
        }),
        postCart: builder.mutation({
            query: ({order, localId}) => ({
                url: `orders/${localId}.json`,
                method: `POST`,
                body: order
            })
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
        }),
        getUserLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
        }),
        postUserLocation: builder.mutation({
            query: ({ location, localId }) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address
                }
            })
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    usePostCartMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetUserLocationQuery,
    usePostUserLocationMutation,
    useGetCategoriesWithProductsQuery,
    useGetOrdersQuery
} = shopApi