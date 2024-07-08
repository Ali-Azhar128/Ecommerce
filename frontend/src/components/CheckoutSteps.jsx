import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className='checkoutSteps'>
        {step1 ? (<Link className='enabledLink' to={'/login'}>Sign In</Link>) : (<Link className='disabledLink'>Login</Link>)}
        {step2 ? (<Link className='enabledLink' to={'/Shipping'}>Shipping</Link>) : (<Link className='disabledLink'>Shipping</Link>)}
        {step3 ? (<Link className='enabledLink' to={'/payment'}>Payment</Link>) : (<Link className='disabledLink'>Payment</Link>)}
        {step4 ? (<Link className='enabledLink' to={'/login'}>Place Order</Link>) : (<Link className='disabledLink'>Place Order</Link>)}
    </div>
    
  )
}

export default CheckoutSteps