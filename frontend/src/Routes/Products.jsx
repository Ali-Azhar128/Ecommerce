
import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productApiSlice';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { Rings } from "react-loader-spinner";
import MessageContainer from "../components/MessageContainer";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Rating from "../components/Rating";

function Products() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const params = useParams()
    const productId = params.id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data: product, error, isLoading, refetch} = useGetProductDetailsQuery(params.id)
    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()
    const user = useSelector((state) => state.auth)
    console.log(product, 'product')

    const cartHandler = () => {
        console.log(qty)
        dispatch(addToCart({...product, qty: Number(qty)}))
        navigate('/cart')
    }   

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            await createReview({
                productId,
                rating,
                comment

            }).unwrap()
            refetch()
            toast.success('Review Submitted')
            setRating(0)
            setComment('')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
            
        }
    }

  return (
    <>
        {isLoading ? (<Rings height={80} width={80} color="black"/>) : error ? (<MessageContainer variant={'danger'} message={error?.data?.message}/>) : (
            <div className="productPage">
            {
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
    
                                <button disabled={product.countInStock <= 0} className="button" onClick={cartHandler}>ADD TO CART</button>
                               
                            </div>
                        </div>
    
    
                    </div>)}
    
                    <div className="reviewsSection">
                        <h3>Reviews</h3>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        {product.reviews.map((review) => (
             
                                <div key={review._id} className="review">
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p className="reviewComment">{review.comment}</p>
                                    <div className="divider"></div>
                       
                                
                                </div>
                        ))}
                        {user.userInfo? (
                            <form onSubmit={submitHandler}>
    
                            <div className="formGroup">
                                <label htmlFor="rating">Rating</label>
                                <select defaultValue={0} id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                <option value="">Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                    rows={3}
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
    
                            </div>
                            <button type="submit" disabled={loadingProductReview} className="button">Submit</button>
                        </form>
                        ) : (<Message>Please {<Link to={'/login'}>sign in</Link>} to write a review</Message>)}
                        
                    </div>  
        </div>
        )}
    </>
  )
}

export default Products