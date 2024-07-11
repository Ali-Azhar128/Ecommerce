import { Rings } from 'react-loader-spinner';
import Card from '../components/Card';
import { useGetProductsQuery } from '../slices/productApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomePage() {
    const { pageNumber, keyword } = useParams()
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });
    console.log(pageNumber, 'pageNumber')
  




   

  // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(event.selected + 1, 'event.selected + 1')
        keyword ? navigate(`/search/${keyword}/page/${event.selected + 1}`) : navigate(`/page/${event.selected + 1}`)
  };




    
    return (
       <div className='mainPage'>
            { 
                isLoading ?
                (<Rings height={100} width={100} color='#2c3339'/>) : 
                error ? 
                (
                ( error?.data?.message ||  error.error)) 
                : (
                <div className='prodPage'>
                  <ProductCarousel/>
                    <h1>LATEST PRODUCTS</h1>
                    {data.products.map((product) => {
                        return <Card product={product}/>
                        
                    })}
                </div>
            ) }
           <div hidden={isLoading || data?.pages < 2}>
           <ReactPaginate
           
           nextLabel=">"
           initialPage={pageNumber - 1}
           onPageChange={handlePageClick}
           pageRangeDisplayed={3}
           marginPagesDisplayed={2}
           pageCount={data?.pages}
           previousLabel="<"
           pageClassName="page-item"
           pageLinkClassName="page-link"
           previousClassName="page-item"
           previousLinkClassName="page-link"
           nextClassName="page-item"
           nextLinkClassName="page-link"
           breakLabel="..."
           breakClassName="page-item"
           breakLinkClassName="page-link"
           containerClassName="pagination"
           activeClassName="active"
           renderOnZeroPageCount={null}
         />
           </div>

            
           
       
       </div>
    )
  
}

export default HomePage
