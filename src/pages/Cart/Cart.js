import React from 'react'

import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../../store/cartSlice'
import './Cart.scss'

const Cart = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.cart);

    const handleRemove = (id) => {
        dispatch(remove(id))
    }

    return (
        <div className='cart'>
            <h3>Cart</h3>
            <div className='cart-items'>
                {
                    products.map((product,index)=>(
                        <div className='cart-item' key={index}>
                            <img src={product.image} alt={product.title} />
                            <div className='cart-content'>
                                <h4>{product.title}</h4>
                                <h5>{product.price}</h5>
                                <h5>Quantity: <span>{product.quantity}</span></h5>
                            </div>
                            <button onClick={()=>handleRemove(product.id)}>Remove</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cart;