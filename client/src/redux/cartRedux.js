import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        quantity: 0,
        price: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += (action.payload.quantity)
            state.cartItems.push(action.payload.item)
            state.price += action.payload.item.product.price * action.payload.quantity
        },
        deleteProduct: (state, action) => {
            state.quantity -= (action.payload.quantity)
            state.cartItems = state.cartItems.filter((item, index) => item.product !== action.payload.item.product)
            state.price -= action.payload.item.product.price * action.payload.quantity
        },
        deleteAllProducts: (state, action) => {
            state.quantity = 0
            state.cartItems = []
            state.price = 0
        }
    },
})

export const { addProduct, deleteProduct, deleteAllProducts } = cartSlice.actions
export default cartSlice.reducer
