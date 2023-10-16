import React, { useEffect } from 'react'

import{ useParams } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'

import { add, } from '../../store/cartSlice'
import { fetchProductById,STATUSES,removeProductDetail} from '../../store/productSlice'

import './ProductDetail.scss'
const ProductDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch()

    const {productDetail:product,status} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProductById(id))
        return () => {
            dispatch(removeProductDetail())
        }
    },[dispatch,id])

    const handleAdd = (product) => {
        dispatch(add(product))
    }

    if(status === STATUSES.LOADING){
        return <h1>Loading...</h1>
    }
    if(status === STATUSES.ERROR){
        return <h1>Something went wrong</h1>
    }

  return (
    <div>
        <h1>Product Detail</h1>
        <div className="product">
            <img src={product.image} alt={product.title} />
            <div className="product-content">
                <div className='product-title'>
                    <h1>{product.title}</h1>
                    <h3>Price : {product.price}</h3>
                </div>
                <p>{product.description}</p>
                <button onClick={()=>handleAdd(product)}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail