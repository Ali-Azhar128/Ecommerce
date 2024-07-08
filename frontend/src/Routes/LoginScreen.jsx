import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)
    


    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/' 

    useEffect(() => {
        if (userInfo) {
           
            navigate(redirect)
        }
    }
    , [navigate, redirect, userInfo])




    const onSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const res = await login({email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
            
        }catch(e){
            toast.error(e?.data?.message || e.error)
        }

    }
  return (
    
    <form onSubmit={onSubmit} className='loginScreen'>
        <h1>Sign In</h1>
        <p>Email Address</p>
        <input onChange={(e) => {
            setEmail(e.target.value)
        }} type='email' placeholder='Enter Email'></input>
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password'></input>
        <button type='submit'>Sign In</button>
        <p className='newCustomerLine'>New Customer? <Link className='registerLink' to={redirect === '/' ? '/register' : `/register?redirect=${redirect}` }> Register</Link></p>
    </form>
  )
}

//remember the rules of / while routing no / means child route

export default LoginScreen