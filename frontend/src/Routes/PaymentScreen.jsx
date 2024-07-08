import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { savePaymentMethod } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'


function PaymentScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    
    useEffect(() => {

        if(!shippingAddress){

            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
        
    }
  return (
    <form className='paymentForm' onSubmit={submitHandler}>
        <CheckoutSteps step1 step2 step3/>
        <h1>PaymentMethod</h1>
        <h2>Select Method</h2>
        <div className="radioBtn">
            <input type="radio" checked value={'PayPal'} onSelect={(e) => {setPaymentMethod(
                console.log(e.target.value),
                e.target.value)}}/>
            <label>Paypal or Credit Card</label>
        </div>
        <button type='submit'>Continue</button>
    </form>
  )
}

export default PaymentScreen