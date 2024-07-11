import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? (
          <FontAwesomeIcon icon={faStar} color={color} />
        ) : value >= 0.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} color={color}/>
        ) : (
          <FontAwesomeIcon icon='fa-regular fa-star' />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FontAwesomeIcon icon={faStar} color={color}/>
        ) : value >= 1.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} color={color}/>
        ) : (
          <FontAwesomeIcon icon='fa-regular fa-star' />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FontAwesomeIcon icon={faStar} color={color}/>
        ) : value >= 2.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} color={color}/>
        ) : (
          <FontAwesomeIcon icon='fa-regular fa-star' />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FontAwesomeIcon icon={faStar} color={color}/>
        ) : value >= 3.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} color={color}/>
        ) : (
          <FontAwesomeIcon icon='fa-regular fa-star' />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FontAwesomeIcon icon={faStar} color={color}/>
        ) : value >= 4.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} color={color}/>
        ) : (
          <FontAwesomeIcon icon='fa-regular fa-star' />
        )}
      </span>
      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;