import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import apiSlice from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, keyword }) => ({
                url: PRODUCT_URL,
                params: {
                    pageNumber,
                    keyword
                }
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,

            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),

        getTopProduct: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { 
    useGetProductsQuery,
    useGetProductDetailsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductQuery
} = productApiSlice