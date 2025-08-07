import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './ProductsSlice'
import cartReducer from './cartSlice'
import  checkOutReducer  from "./CheckOutSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        checkOut: checkOutReducer,
    },
});

export default store;