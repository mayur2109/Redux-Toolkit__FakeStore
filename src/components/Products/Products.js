import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'

import { add } from '../../store/cartSlice'

import { fetchProducts,STATUSES } from '../../store/productSlice'

import Sort from '../Sort/Sort'
import './Products.scss'

const Products = () => {
    const dispatch = useDispatch()
    const {data:products,status} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch])

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
    <div className='products'>
        <h1>All Products</h1>
        <Sort />
        <div className='products-grid'>
            {products.map(product => (
                <div className='products-card' key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <Link to={`/products/${product.id}`}>
                        <h4>
                            {product.title}
                        </h4>
                    </Link>
                    <h5>{product.price}</h5>
                    <button onClick={()=>handleAdd(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products