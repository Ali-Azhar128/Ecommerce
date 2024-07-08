import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


function Card( {product} ) {
  return (
    <Link to={`/products/${product._id}`}>
        <div className='card'>
            <img src={product.image} alt="no Img" />
            <h4>{product.name}</h4>
            <p>{product.rating} from {product.numReviews} reviews</p>
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
            <h1>${product.price}</h1>
        </div>
    </Link>
  )
}

export default Card