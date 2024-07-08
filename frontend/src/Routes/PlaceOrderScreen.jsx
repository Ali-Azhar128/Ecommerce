import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { useCreateOrderMutation } from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { clearCartItems } from '../slices/cartSlice'

function PlaceOrderScreen() {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    const placeOrderHandler = async () => {
       try{
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap()
        dispatch(clearCartItems())
        navigate(`/order/${res._id}`)

       }catch(e){
              toast.error(e?.data?.message || e.error)
       }
    }

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }

    }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

  return (
    <>
        
        <div className='placeOrder'>
        <CheckoutSteps step1 step2 step3 step4/>
        
            <div className="orderArea">
                <div className="userSummary">
                    <h1>Shipping</h1>
                    <div className='userInfo'>
                        <p>Address: </p>
                        <p>{cart.shippingAddress.address}</p>
                    </div>
                    <div className="divider"></div>
                    <h1>Payment Method</h1>
                    <div className='userInfo'>
                        <p>Method: </p>
                        <p>{cart.paymentMethod}</p>
                    </div>
                    <div className="divider"></div>
                    <h1 className='orderItemsHeading'>Order Items</h1>
                    <div className='orderItemsInfo'>
                        {cart.cartItems.map((item, index) => {
                            return <div className='eachItem'>
                            <div className='orderedItems'>
                                <div className='imgAndLink'>
                                    <img src={item.image} alt="" />
                                    <Link to={`/products/${item._id}`}><p>{item.name}</p></Link>
                                </div>
                                <p>{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                            </div>
                            <div className={index === cart.cartItems.length - 1 ? '' : 'divider'}></div>
                            </div>
                            
                        })}
                    </div>
                </div>
                <div className="orderSummary">
                    <div className="cartCheckout">
                        <h1>Order Summary</h1>
                        <div className="divider"></div>
                        <div className='itemsPriceDiv'>
                            <p>Items:</p>
                            <p>${(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)).toFixed(2)}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="taxPriceDiv">
                            <p>Shipping:</p>
                            <p>${(cart.shippingPrice).toFixed(2)}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="totalPriceDiv">
                            <p>Tax:</p>
                            <p>${(cart.taxPrice).toFixed(2)}</p>
                        </div>
                        <div className="divider"></div>
                        <div className="totalPriceDiv">
                            <p>Total:</p>
                            <p>${(cart.totalPrice)}</p>
                        </div>
                        <div className="divider"></div>
                        <button onClick={placeOrderHandler} className='button'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PlaceOrderScreen