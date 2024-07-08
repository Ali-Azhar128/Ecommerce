
import ReactStars from "react-rating-stars-component";
import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { Rings } from "react-loader-spinner";

function Products() {
    const [qty, setQty] = useState(1)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data: product, error, isLoading} = useGetProductDetailsQuery(params.id)

    const cartHandler = () => {
        console.log(qty)
        dispatch(addToCart({...product, qty: Number(qty)}))
        navigate('/cart')
    }   
  return (
    <div className="productPage">
        {isLoading ? (<Rings height={100} width={100} color="#2c3339"/>) : error ? (error?.data?.message || error.error) :
         (<div className='productDiv'>
                    <div className="backLink">
                        <Link to={'/products/'} style={{textDecoration: 'none'}}>
                                <p>Go Back</p>
                            </Link>
                    </div>
                    
                    <div className="productDetails">
                        <img src={product.image} alt="" />
                        <div className='productDesc'>
                            <h3>{product.name}</h3>
                            <div className="divider"></div>
                            <ReactStars
                            count={5}
                            activeColor="#ffd700" 
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            edit={false}
                            value={product.rating}
                            />
                            <div className="divider"></div>
                            <p>Price: ${product.price}</p>
                            <div className="divider"></div>
                            <p>Description: {product.description}</p>

                        </div>
                        <div className="shopContainer">
                            <div className="div1">
                                <p>Price:</p>
                                <p>${product.price}</p>
                            </div>
                            <div className="divider"></div>
                            <div className="div2">
                                <p>Status:</p>
                                <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            </div>
                            <div className="divider"></div>
                            <div className="div2">
                            <p>Quantity:</p>
                            <select onChange={(e) => {
                                   
                                    setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                                ))}
                            </select>
                            </div>
                            <div className="divider"></div>

                            <button disabled={product.countInStock < 0} className="button" onClick={cartHandler}>ADD TO CART</button>
                           
                        </div>
                    </div>


                </div>)}
        
      
                
                 
            
            
        
      
    


        
    </div>
  )
}

export default Products