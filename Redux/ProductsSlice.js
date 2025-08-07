import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    products : [],
    loading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://dummyjson.com/products');
    if(!response.ok){
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products || data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message;
        });
    },
});

export default productsSlice.reducer;