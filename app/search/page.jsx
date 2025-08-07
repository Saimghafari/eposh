'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Stack } from '@mui/material';
import { useSearch } from '@/Components/Context/SearchContext';
import ProductsCards from '@/Components/ProductsCards';
import { fetchProducts } from '@/Redux/ProductsSlice';
import { useSelector, useDispatch } from 'react-redux';

function Page() {
    const { searchData, handleInputChange, filteredProducts } = useSearch();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                // textAlign: 'center',
                p: 3,
                mt: { xs: 15, md: 4 },
            }}
        >
            {filteredProducts.length === 0 && (
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Your search for "{searchData}" did not yield any results.
                </Typography>
            )}

           <Stack
                direction="row"
                spacing={0} 
                sx={{
                    width: '100%',
                    maxWidth: 500, 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    overflow: 'hidden', 
                    mb: 4, 
                }}
            >
                <TextField
                    variant="standard" 
                    placeholder="Search products..."
                    value={searchData}
                    onChange={handleInputChange}
                    InputProps={{
                        disableUnderline: true, 
                        sx: {
                            flexGrow: 1, 
                            px: 2, 
                            py: 1, 
                            fontSize: '1rem', 
                        },
                    }}
                    sx={{
                        
                        '& .MuiInputBase-input': {
                            padding: 0, // Remove default TextField input padding
                        },
                        flexGrow: 1, // Ensures TextField expands
                    }}
                />
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 0, 
                        borderLeft: '1px solid #ccc', 
                        borderColor: 'transparent', 
                        color: 'text.primary', 
                        py: 1, 
                        px: 3, 
                        textTransform: 'uppercase', 
                        fontWeight: 'normal', 
                        
                        '&:hover': {
                            backgroundColor: '#d2a857',
                            borderColor: 'transparent', 
                        },
                    }}
                >
                    SEARCH
                </Button>
            </Stack>

            <Grid container spacing={2} justifyContent="center">
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <ProductsCards product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Page;