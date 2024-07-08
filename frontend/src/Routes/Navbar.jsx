import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { deleteCredentials } from '../slices/authSlice';


function Navbar() {
  const [logout] = useLogoutMutation()
  const { cartItems, itemPrice } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async() => {
    try{
      await logout().unwrap()
      dispatch(deleteCredentials())
      navigate('/login')

    }catch(err){
      console.log(err)
    }
  }

  console.log(cartItems)
  console.log(itemPrice)


    
  return (
    <div className='navigation'>
        <Link to={'/products'}>
          <h3>PROSHOP</h3>
        </Link>
        <div className="navButtons">
         <Link className='link' to={'/cart'}>
          <div className='navBtn1'>
              <FontAwesomeIcon  icon={faCartShopping}>
            
              </FontAwesomeIcon>
              {cartItems.length > 0 && <span className='itemCounter'>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>}
              <p>CART</p>
              
            </div>
        </Link>
          <div className='navBtn2'>
              {userInfo ? (<div className='dropDown'>
                <button className='dropBtn'>{JSON.parse(localStorage.getItem('userInfo')).name} <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                <div className="dropdown-content">
                  <Link to={'/profile'}>Profile</Link>
                  <Link onClick={handleLogout} to={'/login'}>Logout</Link>
                </div>

              </div>) : 
              (<Link className={`link ${location.pathname === '/login' ? 'link-active' : ''}`} to={'/login'}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <p >Sign In</p>
              </Link>)}
          </div>
          <div className='navBtn3'>
              {(userInfo && userInfo.isAdmin) && (<div className='dropDown'>
                <button className='dropBtn'>Admin <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                <div className="dropdown-content">
                  <Link to={'/admin/productList'}>Products</Link>
                  <Link to={'/admin/userList'}>Users</Link>
                  <Link to={'/admin/orderList'}>Orders</Link>
                </div>

              </div>)}
          </div>
      
            
        </div>
    </div>
  )
}

export default Navbar


