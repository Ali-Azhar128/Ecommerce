import { Link, Navigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setcPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register, {isLoading}] = useRegisterMutation()

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/products' 
    const handleSubmit = async(e) =>  {
        e.preventDefault()
        
        
        if(password !== cPassword){
            toast.error('Passwords do not match')
            return
        }
        else{
            try{
            
                const res = await register({name, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
    
            }catch(e){
                toast.error(e?.data?.message || e.error)
            }
            
        }
        
        

    }


    
  return (
    
    <form onSubmit={handleSubmit} className='loginScreen'>
        <h1>Sign Up</h1>
        <p>Name</p>
        <input onChange={(e) => {
            setName(e.target.value)
        }} type='text' placeholder='Enter Email'></input>
        <p>Email Address</p>
        <input onChange={(e) => {
            setEmail(e.target.value)
        }} type='email' placeholder='Enter Email'></input>
        <p>Password</p>
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password'></input>
        <p>Confirm Password</p>
        <input onChange={(e) => setcPassword(e.target.value)} type='password' placeholder='Enter Password'></input>
        <button type='submit'>Sign In</button>
        <p className='newCustomerLine'>Already a Customer? <Link className='registerLink' to={redirect === '/products' ? '/login' : `/login?redirect=${redirect}`}> Login</Link></p>
    </form>
  )
}

export default RegisterScreen