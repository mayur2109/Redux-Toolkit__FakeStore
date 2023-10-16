import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SORTED: 'sorted'
})

const productSlice = createSlice({
  name: 'product',
  initialState:{
    data:[],
    status:STATUSES.IDLE,
    productDetail:{},
  },
  reducers: {
    setProducts(state,action){
      state.data = action.payload
    },
    setStatus(state,action){
      state.status = action.payload
    },
    setProductDetail(state,action){
      state.productDetail = action.payload
    },
    removeProductDetail(state){
      state.productDetail = {}
    },
    sortByPrice(state,action){
      const data  = state.data.sort((a,b)=>a.price - b.price)
      state.data = data
    },
    sortReverse(state,action){
      const data  = state.data.sort((a,b)=>b.price - a.price)
      state.data = data
    },
    clearState(state){
      state.data = []
      state.status = STATUSES.IDLE
      state.productDetail = {}
    }
  },
});

export const {
  setProducts,
  setStatus,
  setProductDetail,
  removeProductDetail,
  sortByPrice,
  sortReverse,
  clearState
} = productSlice.actions

export default productSlice.reducer
//Thunk

export function fetchProducts(){
  return async function fetchProductThunk(dispatch,getState){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const { data } = await axios.get('https://fakestoreapi.com/products')
      dispatch(setProducts(data))
      dispatch(setStatus(STATUSES.IDLE))
    }catch(error){
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}

export function fetchProductById(id){
  return async function fetchProductByIdThunk(dispatch,getState){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)
      dispatch(setProductDetail(data))
      dispatch(setStatus(STATUSES.IDLE))
    }catch(error){
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}

export function sortProductsByCategory(value){
  return async function sortProductsThunk(dispatch,getState){
    dispatch(setStatus(STATUSES.LOADING))
    try{
      if (value === 'All') {
        const { data } = await axios.get('https://fakestoreapi.com/products')
        dispatch(setProducts(data))
        dispatch(setStatus(STATUSES.IDLE))
        return
      }
      const { data } = await axios.get(`https://fakestoreapi.com/products/category/${value}`)
      dispatch(setProducts(data))
      dispatch(setStatus(STATUSES.IDLE))
    }catch(error){
      dispatch(setStatus(STATUSES.ERROR))
    }
  }
}