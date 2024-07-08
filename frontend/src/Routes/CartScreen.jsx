import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addToCart, deleteFromCart } from '../slices/cartSlice'



function CartScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const redirectToLogin = () => {
  navigate('/login?redirect=/shipping');
};
    const [qty, setQty] = useState(1)
    const cart  = useSelector((state) => state.cart)
    const { cartItems } = cart
    
    const handleDelete = (id) => {
        dispatch(deleteFromCart({id}))



    }
   
  
  return (
    <div className='cartScreen'>
       <div className="cartContainer">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <h3 className='emptyCartHeading'>Cart is Empty</h3> :
            cartItems.map((item) => {
                return <>
                    <div className="cartCard">
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <select value={item.qty} onChange={(e) => {
                            dispatch(addToCart({...item, qty: Number(qty)}))
                            setQty(e.target.value)
                        }}>
                            {[...Array(item.countInStock).keys()].map((x) => {
                                return <option value={x+1}>{x+1}</option>
                            })}
                        </select>
                        <FontAwesomeIcon className='trashIcon' icon={faTrash} onClick={() => handleDelete(item._id)}></FontAwesomeIcon>
                    </div>
                    <div className="divider"></div>
                </>
            })}
       </div>
       <div className="cartCheckout">
            <h2>Subtotal {cartItems.reduce((a, c) => a + c.qty, 0)} Items</h2>
            <p>${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</p>
            <div className="divider"></div>
            <button onClick={redirectToLogin} disabled={cartItems.length === 0} className='button'>Proceed To Checkout</button>
       </div>
       
    </div>
  )
}

export default CartScreen