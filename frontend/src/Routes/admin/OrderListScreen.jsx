import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { Rings } from 'react-loader-spinner';
import MessageContainer from '../../components/MessageContainer'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OrderListScreen = () => {
  const { data: orders, error, isLoading, refetch } = useGetOrdersQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="adminOrderScreen">{
      isLoading ? (<div className='loader'>
          <Rings height={80} width={80} color='#2c3339'/>
      </div>) : error ? (<MessageContainer variant='danger' message={error?.data?.message || error.error}/>) : (
      <div className='orderData'>
          <h1>My Orders</h1>
          <table>
           
              <tr className='headingRow'>
                  <th>ID</th>
                  <th>User</th>
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
                      <td>{order.user && order.user.name}</td>
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
                      
                      
                  
                  </div>
                  
              ))

          }
          
          </table>
        
      </div>)
  }</div>
  )
}

export default OrderListScreen