import apiSlice from "./apiSlice";
import { ORDERS_URL, STRIPE_URL } from "../constants";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => (
        {
            createOrder: builder.mutation({
                query: (order) => (
                    {
                        url: ORDERS_URL,
                        method: 'POST',
                        body: {...order}
                    }
                )
               
            }),
            getOrderDetails: builder.query({
                query: (orderId) => ({
                    url: `${ORDERS_URL}/${orderId}`
                }),
                keepUnusedDataFor: 5
            }),
            payOrder: builder.mutation({
                query: ({ orderId, details }) => ({
                    url: `${ORDERS_URL}/${orderId}/pay`,
                    method: 'PUT',
                    body: { ...details }
                })
            }),
            getStripeKey: builder.mutation({
                query: (details) => ({
                    url: STRIPE_URL,
                    method: 'POST',
                    body: { ...details }
                }),
                keepUnusedDataFor: 5
            }),

            getMyOrders: builder.query({
                query: () => ({
                    url: `${ORDERS_URL}/mine`
                }),
                keepUnusedDataFor: 5
            }),

            getOrders: builder.query({
                query: () => ({
                    url: ORDERS_URL
                }),
                keepUnusedDataFor: 5
            }),
            
            deliverOrder: builder.mutation({
                query: (orderId) => ({
                    url: `${ORDERS_URL}/${orderId}/deliver`,
                    method: 'PUT',
                })
            })
        }
    )
})

export const { 
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation, 
    useGetStripeKeyMutation, 
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation
 } = orderApiSlice