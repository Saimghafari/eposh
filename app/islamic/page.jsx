'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
} from '@mui/material';
import { fetchProducts } from '@/Redux/ProductsSlice';
import { useSelector, useDispatch } from 'react-redux';
import ProductsCards from '@/Components/ProductsCards';
import { useSearch } from '@/Components/Context/SearchContext';


function Page() {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { searchData } = useSearch();


    const displayProducts = searchData ?
        categoryProducts.filter((product) =>   // category base search method
            product.title.toLowerCase().includes(searchData.toLowerCase())
        ) : categoryProducts;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const filtered = products.filter((p) => p.category === 'groceries');
        setCategoryProducts(filtered);
    }, [products]);

    if (loading) {
        return (
            <Box
                sx={{
                    height: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'start',
                    mb: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginLeft: 5
                }}
            >
                Islamic  Calligraphy
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
            >
                {displayProducts.length === 0 ? (
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '300px',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                No Results Found
                            </Typography>
                        </Box>
                    </Grid>
                ) : (
                    displayProducts.map((product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={product.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ProductsCards product={product} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}

export default Page;