import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { saveShippingAddress } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'


function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const navigate = useNavigate()

    
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(shippingAddress.address)

    }, [shippingAddress])

    const submitHandler = async(e) => {
        e.preventDefault()
        try{
            dispatch(saveShippingAddress({address, city, postalCode, country}))
            navigate('/payment')

        }catch(e){
            toast.error(e?.data?.message || e.error)
        }
    }
  return (
    <form className='shippingForm' onSubmit={submitHandler}>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <p>Address</p>
        <input value={address} onChange={(e) => {
            setAddress(e.target.value)
            
            
        }} type='text' placeholder='Enter Address'></input>
        <p>City</p>
        <input value={city} onChange={(e) => {
            setCity(e.target.value)
        }} type='text' placeholder='Enter City'></input>
        <p>Postal Code</p>
        <input value={postalCode} onChange={(e) => {
            setPostalCode(e.target.value)
        }} type='text' placeholder='Enter Postal Code'></input>
        <p>Country</p>
        <input value={country} onChange={(e) => {
            setCountry(e.target.value)
        }} type='text' placeholder='Enter Country'></input>
        <button type='submit'>Continue</button>
    </form>
  )
}

export default ShippingScreen