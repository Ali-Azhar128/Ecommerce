import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'
import { Rings } from 'react-loader-spinner';
import MessageContainer from '../../components/MessageContainer'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
  const { pageNumber } = useParams()
  const { data, error, isLoading, refetch } = useGetProductsQuery({ pageNumber })

  const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  const handleAdd = async() => {
  
    if(window.confirm('Are you sure you want to create a new product?'))
      {
        try{
          await createProduct()
          refetch()

        }catch(e){
          toast.error(e?.data?.message || e.error)
          

      }
  
  }
}

  const editHandler = (id) => {
    console.log('edit', id)
  }

  const deleteHandler = async(id) => {
    if(window.confirm('Are you sure you want to delete this product?'))
      {
        try {
          await deleteProduct(id).unwrap()
          toast.success('Product deleted successfully')
        } catch (error) {
          toast.error(error?.data?.message || error.error)
          
        }
        refetch()

      }
  }


  return (
    <div className='createProdPage'>
      <div className="prodTopRow">
        <div className="products">
          <h1>Product</h1>
        </div>
        <button onClick={handleAdd} className='button'><FontAwesomeIcon icon={faEdit} style={{color: 'white', fontWeight: 'bold', fontSize: '8px'}}/>
        {loadingCreate ? (<Rings height={20} width={20} color='white'/>) : <p>Create Product</p>}
        </button>
      </div>


        
        {isLoading ? (<Rings height={100} width={100} color='black'/>) : error ? (<MessageContainer variant='danger' message={error?.data?.message || error.error}/>) : (
          <>
            <table>
            
            <tr className='headingRow'>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
                <th></th>
                
            </tr>
            
        
            <tbody  className="dataRow">
            {
              (data.products.map((product) => (
              
                  <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                          <Link to={`/admin/product/${product._id}/edit`}>
                          <button onClick={() => editHandler(product._id)} className='button'><FontAwesomeIcon icon={faEdit} style={{color: 'white', fontWeight: 'bold', fontSize: '8px'}}/></button>
                          </Link>
                      </td>
                      <td>
                        <button onClick={() => deleteHandler(product._id)} style={{backgroundColor: '#e74a3e'}} className='button'><FontAwesomeIcon icon={faTrash} style={{color: 'white', fontWeight: 'bold', fontSize: '10px'}}/></button>
                      </td>
                  
                  </tr>
                  
                  
              
              
              
            ))

            )}
            </tbody>
        
        </table>
          
        </>
          
        )}
    </div>
  )
}

export default ProductListScreen


