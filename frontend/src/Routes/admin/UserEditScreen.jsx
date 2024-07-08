import { Form, Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useUpdateUserMutation, useGetUserDetailsQuery } from "../../slices/usersApiSlice"
import { useEffect, useState } from "react"
import { Rings } from "react-loader-spinner"
import MessageContainer from "../../components/MessageContainer"


const ProductEditScreen = () => {
    const { id: userId } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
  
    const navigate = useNavigate()

    const [updateUser, { isLoading: loadingUpdate, error: errorUpdate }] = useUpdateUserMutation()
    const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId)


    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
    , [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          const updatedUser = {
            userId,
            name,
            email,
            isAdmin,
            }
            
          const data  = await updateUser(updatedUser).unwrap()
          if(data) {
              toast.success('Product Updated Successfully')
              refetch()
              navigate('/admin/userlist')
          } else {
              console.log(data, 'data')
              toast.error('Failed to update product')
          }
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
    }

  return (
    <div className="editProductScreen">
        <button className="button">
            <Link style={{textDecoration: 'none', color: 'white'}} to="/admin/userlist">Go Back</Link>
        </button>
        {
            isLoading ? (<Rings width={100} height={100} color="black"/>) : error ? (<MessageContainer variant={'danger'} message={(error?.status === 500 && 'User Not Found') || error.error}/>) : (
                <Form className="editForm" onSubmit={submitHandler}>
                    <div className="nameField">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"/>
                    </div>
                    <div className="priceField">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
                    </div>
                    <div className="brandField" style={{ display: 'flex', flexDirection: 'row'}}>
                        <input type="checkbox" style={{ marginRight: '5px', borderRadius: '5px' }} checked={isAdmin} value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}/>
                        <label>is Admin</label>
                       
                    </div>
                    <div className="buttonField">
                       <button className="button" type="submit">Submit</button>
                    </div>
                </Form>
            )
        }

    </div>
  )
}

export default ProductEditScreen