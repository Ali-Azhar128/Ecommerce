import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal'
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id)

            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === item._id ? item : x)
            }else{
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);


        },
        deleteFromCart: (state, action) => {
            const item = action.payload
   
            state.cartItems = state.cartItems.filter((x) => x._id !== item.id);
            localStorage.setItem('cartItems', JSON.stringify(state));   
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart(state)
        },
        clearCartItems: (state, action) => {
            state.cartItems = []
            return updateCart(state)

        }
    }
});

export const { addToCart, deleteFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;

    