'use client';
import React, { useEffect } from 'react';
import { Box, Grid, Typography, Skeleton } from '@mui/material';
import { fetchProducts } from '@/Redux/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductsCards from '../Components/ProductsCards';
import { useSearch } from './Context/SearchContext';


function CardsSection() {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);
    const { searchData, filteredProducts } = useSearch();

    const displayProducts = searchData.trim() ? filteredProducts : products

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <Box sx={{ py: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    paddingBottom: 6,
                    flexWrap: 'wrap', // optional: wraps items on small screens
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    }}
                >
                    Bridal Collection
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    }}
                >
                    Duvet Sets
                </Typography>
            </Box>

            {loading ? (
                <Grid container spacing={2} >
                    {Array.from(new Array(8)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Skeleton variant="rectangular" height='100%' />
                        </Grid>
                    ))}
                </Grid>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : displayProducts.length > 0 ? (
                <Grid container spacing={2} justifyContent='center'>
                    {displayProducts.slice(0, 8).map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <ProductsCards product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '300px',
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        No Results Found
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default CardsSection;