import { Form, Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from "../../slices/productApiSlice"
import { useEffect, useState, useRef } from "react"
import { Rings } from "react-loader-spinner"
import MessageContainer from "../../components/MessageContainer"


const ProductEditScreen = () => {
    const { id: productId } = useParams()
    console.log(productId, 'id')


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const navigate = useNavigate()

    const [updateProduct, { isLoading: loadingUpdate, error: errorUpdate }] = useUpdateProductMutation()
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId)
    const [uploadImage, { isLoading: loadingUpload, error: errorImage }] = useUploadProductImageMutation()

    useEffect(() => {
        if(product) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }
    , [product])

    const submitHandler = async (e) => {
        e.preventDefault()
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }

        const data  = await updateProduct(updatedProduct).unwrap()
        if(data) {
            toast.success('Product Updated Successfully')
            refetch()
            navigate('/admin/productList')
        } else {
            console.log(data, 'data')
            toast.error('Failed to update product')
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        console.log(file, 'file')
        formData.append('image', file)
        try {
            const res = await uploadImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
        } catch (error) {
            console.log(error?.data?.message || error.error, 'error')
            toast.error(error?.data?.message || error.error)
            
        }
    }

  return (
    <div className="editProductScreen">
        <button className="button">
            <Link style={{textDecoration: 'none', color: 'white'}} to="/admin/productList">Go Back</Link>
        </button>
        {
            isLoading ? (<Rings width={100} height={100} color="black"/>) : error ? (<MessageContainer variant={'danger'} message={error?.data?.message || error.error}/>) : (
                <Form className="editForm" onSubmit={submitHandler}>
                    <div className="nameField">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name"/>
                    </div>
                    <div className="priceField">
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price"/>
                    </div>
                    <div className="imageField">
                        <label>Image</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/mouse.jpg"/>
                        <input type="file" onChange={ uploadFileHandler } label="Choose File"/>
                    
                    </div>
                    <div className="brandField">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter Brand"/>
                    </div>
                    <div className="stockField">
                        <label>Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Enter quantity"/>
                    </div>
                    <div className="categoryField">
                        <label>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category"/>
                    </div>
                    <div className="descriptionField">
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description"/>
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