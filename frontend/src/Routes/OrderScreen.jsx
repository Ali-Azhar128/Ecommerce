import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useGetOrderDetailsQuery, useGetStripeKeyMutation, usePayOrderMutation, useDeliverOrderMutation } from '../slices/orderApiSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js'
import { Rings } from 'react-loader-spinner'
import MessageContainer from '../components/MessageContainer'


function OrderScreen() {

    


    const [hideCard, setHideCard] = useState(true)
    const [hideBtn, setHideBtn] = useState(true)
    const [showLoading, setShowLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const {id: orderId} = useParams()
    console.log(orderId, 'orderId')
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)
    const [stripeKey, {isLoading: keyLoading, error: keyError}] = useGetStripeKeyMutation()
    const [payOrder, {isLoading: payLoading, error: payError}] = usePayOrderMutation()
    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect_status') || '/' 
    const currency = 'USD'
    const { userInfo } = useSelector(state => state.auth)



    useEffect(() => {
        if(stripe){
            setHideBtn(false)
        
        }
    }, [stripe])
    useEffect(() => {
        async function fetchKey(){
           if(!isLoading && !keyLoading && order){
            try{
                const res = await stripeKey({amount: order.totalPrice, currency: currency }).unwrap()
                console.log(res, 'res')
            }catch(e){
                toast.error(e?.data?.message || e.error)
            }
           }
           
        }

        fetchKey()
    },
    [stripeKey, currency, isLoading, order])

    useEffect(() => {
        async function updateToPaid(){
            if(redirect === 'succeeded'){
                const res = await payOrder({orderId, order}).unwrap()
                const updatedOrder = res
                console.log(updatedOrder, 'updatedOrder')
                refetch()
                toast.success('Payment Successful')
    
                
               }
        }
        updateToPaid()
    }, [ payOrder]



)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        elements.submit()
        let res;
        if(!isLoading && !keyLoading && order){
            try{
                res = await stripeKey({amount: order.totalPrice, currency: currency }).unwrap()
                console.log(res, 'res')
            }catch(e){
                toast.error(e?.data?.message || e.error)
            }
           }

        
        if (!stripe || !elements) {
            toast.error('Stripe is not loaded')
            return
            
        }
        console.log(res.clientSecret, 'clientSecret')
        if (!res.clientSecret) {
            console.error('clientSecret is missing');
            toast.error('Payment cannot be processed at this time.');
            return;
        }


        
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            clientSecret: res.clientSecret,
            elements: elements,
            confirmParams: {
                return_url: process.env.NODE_ENV === 'production' ? `https://shopease-2wtu.onrender.com/${orderId}` : `http://localhost:5005/order/${orderId}`,
            },
          });
          setShowLoading(false)
        
        

        if(result.error){
            toast.error(result.error.message)
        }else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
          }
    }

    const handleDeliver = async () => {
        try{
            const res = await deliverOrder(orderId).unwrap()
            console.log(res, 'res')
            refetch()
            toast.success('Order Delivered')

        }catch(e){
            toast.error(e?.data?.message || e.error)
        }
    }


  return (
    <div className='orderedScreen'>
        {isLoading ? (<div className='loader'>
          <Rings height={80} width={80} color='#2c3339'/>
      </div>) : error ? (<h3>There is an error while fetching</h3>) : (
            <>
                <div className='shippingSummary'>
                    <h1>Order: {orderId}</h1>
                    <div className="shippingStatus">
                    <h2>Shipping</h2>
                    <div className="userDetails">
                        <p>Name:</p>
                        <p>{order.user.name}</p>
                    </div>
                    <div className="userDetails">
                        <p>Email:</p>
                        <p>{order.user.email}</p>
                    </div>
                    <div className="userDetails">
                        <p>Address:</p>
                        <p>{order.shippingAddress.address}</p>
                    </div>
                    <div className="deliveryStatus">
                        {order.isDelivered ?
                        (<div className='deliveredBox'>Delivered</div>)
                        : (<div className='notDeliveredBox'>Not Delivered</div>)}
                    </div>
                    <div className="divider"></div>
                    <h1 className='paymentHeading'>Payment Method</h1>
                    <div className='paymentInfo'>
                        <p>Method: </p>
                        <p>{order.paymentMethod}</p>
                    </div>
                    <div className="deliveryStatus">
                        {order.isPaid ?
                       <MessageContainer variant='message' message={'Paid'}/>
                        : <MessageContainer variant='danger' message={'Not Paid'}/>}
                    </div>
                    <div className="divider"></div>
                    <h1 className='orderItemsHeading'>Order Items</h1>
                    <div className='orderItemsInfo'>
                        {order.orderItems.map((item, index) => {
                            return <div className='eachItem'>
                            <div className='orderedItems'>
                                <div className='imgAndLink'>
                                    <img src={item.image} alt="" />
                                    <Link to={`/products/${item._id}`}><p>{item.name}</p></Link>
                                </div>
                                <p>{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                            </div>
                            </div>
                            
                        })}
                    </div>
                    
                
                
                </div>
            
        </div>
        <div className='placedOrderSummary'>
        <div className="cartCheckout">
                        <h1>Order Summary</h1>
                        <div className="divider"></div>
                        <div className='itemsPriceDiv'>
                            <p>Items:</p>
                            <p>${(order.orderItems.reduce((a, c) => a + c.qty * c.price, 0)).toFixed(2)}</p>
                        </div>
                        
                        <div className="taxPriceDiv">
                            <p>Shipping:</p>
                            <p>${(order.shippingPrice).toFixed(2)}</p>
                        </div>
                        
                        <div className="totalPriceDiv">
                            <p>Tax:</p>
                            <p>${(order.taxPrice).toFixed(2)}</p>
                        </div>
                        
                        <div className="totalPriceDiv">
                            <p>Total:</p>
                            <p>${(order.totalPrice)}</p>
                        </div>
                        <div className="divider"></div>
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
                            <button onClick={handleDeliver} className='button' hidden={loadingDeliver}>Mark as Delivered</button>
                        ) :  <button hidden={redirect === 'succeeded' || userInfo.isAdmin} onClick={() => {setHideCard(false)

                        }} className='button'>Debit or Credit Card</button>
                            }
                        
                    </div>
                    
                    <div className={hideCard ? '' : 'cardInfo'} hidden={hideCard && !keyLoading}>
                        {(stripe && !hideCard) && <PaymentElement/>}
                        <button hidden={hideBtn} className='button' onClick={handleSubmit}>{showLoading ? <Rings
                                height={20}
                                width={20}
                                color='white'
                        />: 
                           'Pay' }</button>
                    </div>
        </div>
      

                    
         </>
        )}
    </div>
  )
}

export default OrderScreen