export const updateCart = (state) => {
     //Calculate Item Price
     state.itemPrice = Number(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);

     //Calculate Shipping Price
     state.shippingPrice = state.itemPrice > 100 ? 0 : 10;

     //Calculate Tax Price
     state.taxPrice = Number((0.15 * state.itemPrice).toFixed(2));

     //Calculate Total Price
     state.totalPrice = (Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

     localStorage.setItem('cartItems', JSON.stringify(state));

     return state;
}