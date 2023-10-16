import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState:[],
  reducers: {
    add(state,action){
      if (state.some(item => item.id === action.payload.id)) {
        return state.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
      }
      state.push({ ...action.payload, quantity: 1 })
    },
    remove(state,action){
      if (state.some(item => item.id === action.payload && item.quantity > 1)) {
        return state.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
      }
      return state.filter(item => item.id !== action.payload)
    },
  }
});

export const {add,remove} = cartSlice.actions

export default cartSlice.reducer