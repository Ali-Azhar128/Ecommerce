import { Rings } from 'react-loader-spinner';
import Card from '../components/Card';
import { useGetProductsQuery } from '../slices/productApiSlice';

function HomePage() {
    const { data: products, isLoading, error } = useGetProductsQuery();
    

   



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
                    <h1>LATEST PRODUCTS</h1>
                    {products.map((product) => {
                        return <Card product={product}/>
                        
                    })}
                </div>
            ) }
           
       
       </div>
    )
  
}

export default HomePage
