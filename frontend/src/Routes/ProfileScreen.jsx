import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateProfileMutation } from '../slices/usersApiSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { Form, Link } from 'react-router-dom'
import { Rings } from 'react-loader-spinner'
import MessageContainer from '../components/MessageContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const [updateProfile, {isLoading: isLoadingUpdateProfile}] = useUpdateProfileMutation()
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()

    console.log(orders, 'orders')

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!userInfo) {
            return
        }
        setName(userInfo.name)
        setEmail(userInfo.email)
    }
    , [userInfo.name, userInfo.email, userInfo])

    const submitHandler = async(e) => {

        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }
        try{
            console.log(name, 'name')
            const res = await updateProfile({name, email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
            toast.success('Profile Updated')
        }
        catch(e){
            toast.error(e?.data?.message || e.error)
        }


    }


  return (
    <Form onSubmit={submitHandler} className='updateUserProfileForm'>
        <div className="userProfileCol">
            <h1>User Profile</h1>
            <label>Name</label>
            <input value={name} onChange={(e) => {
                console.log(e.target.value)
                setName(e.target.value)
            }} type='text' placeholder='Enter Name'></input>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Email'></input>
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password'></input>
            <label>Confirm Password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm Password'></input>
            <button className='button' type='submit'>Update</button>
            { isLoadingUpdateProfile && <Rings color='white' height={60} width={60} />}
        </div>
        <div className="userOrderCol">{
            isLoading ? (<div className='loader'>
                <Rings height={80} width={80} color='#2c3339'/>
            </div>) : error ? (<MessageContainer variant='danger' message={error?.data?.message || error.error}/>) : (
            <div className='orderData'>
                <h1>My Orders</h1>
                <table>
                 
                    <tr className='headingRow'>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                        
                    </tr>
                    
                
                <div className="divider"></div>
                
                    {orders.map((order) => (
                        <div className="dataRow">
                            <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : <FontAwesomeIcon icon={faTimes} style={{color: 'red', fontWeight: 'bold', 
                                fontSize: '16px'
                            }}
                            />}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<FontAwesomeIcon icon={faTimes} style={{color: 'red', fontWeight: 'bold', 
                                fontSize: '16px'}}
                            />)}</td>
                            <td>
                                <Link to={`/order/${order._id}`}>
                                <button className='button'>Details</button>
                                </Link>
                            </td>
                            
                            </tr>
                            <div className="divider"></div>
                            
                        
                        </div>
                        
                    ))

                }
                
                </table>
              
            </div>)
        }</div>
    </Form>
  )
}

export default ProfileScreen