import React from 'react'
import { Link } from 'react-router-dom'

import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { Rings } from 'react-loader-spinner';
import MessageContainer from '../../components/MessageContainer'
import { faEdit, faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete, error: errorDelete }] = useDeleteUserMutation()
  
    const editHandler = () => {
        console.log('Edit')
    }

  const deleteHandler = async(id) => {
    try {   
        if(window.confirm('Are you sure?')){
            const res = await deleteUser(id).unwrap()
            toast.success(res.message)
        }
        
    } catch (error) {
        toast.error(error?.data?.message || error.error)
        
    }
  }


  return (
    <div className='createProdPage'>
      <div className="prodTopRow">
        <div className="products">
          <h1>Users</h1>
          
        </div>
      </div>


        
        {isLoading ? (<Rings height={100} width={100} color='black'/>) : error ? (<MessageContainer variant='danger' message={error?.data?.message || error.error}/>) : (
          <>
            <table>
            
            <tr className='headingRow'>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Admin</th>
                <th></th>
                
            </tr>
            
        
            <tbody  className="dataRow">
            {
              (users.map((user) => (
              
                  <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                      <td>{user.isAdmin ? <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }}/> : <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }}/>}</td>
                      <td style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to={`/admin/user/${user._id}/edit`}>
                            <button onClick={() => editHandler(user._id)} style={{backgroundColor: '#2c3339', marginLeft: '0', marginRight: '5px'}} className='button'><FontAwesomeIcon icon={faEdit} style={{color: 'white', fontWeight: 'bold', fontSize: '10px'}}/>
                            </button>
                        </Link>
                        <button onClick={() => deleteHandler(user._id)} style={{backgroundColor: '#e74a3e',
                            marginLeft: '0', marginRight: '0'
                        }} className='button'><FontAwesomeIcon icon={faTrash} style={{color: 'white', fontWeight: 'bold', fontSize: '10px'}}/>
                        </button>
                        
                      </td>
                  
                  </tr>
                  
                  
              
              
              
            ))

            )}
            </tbody>
        
        </table>
        {loadingDelete && <Rings color='black'/>}
          
        </>
          
        )}
    </div>
  )
}

export default UserListScreen


