'use client';
import React from 'react';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';

function BreadCrumbs({ product }) {
    const router = useRouter();

    const handleBreadcrumbClick = (path) => (event) => {
        event.preventDefault();
        router.push(path);
    };

    return (
        <Box sx={{  px: 2 }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{
                    '& .MuiBreadcrumbs-separator': {
                        color: 'text.secondary',
                    },
                }}
            >
                <Typography
                    component={Link}
                    href="/"
                    onClick={handleBreadcrumbClick('/')}
                    sx={{
                        textDecoration: 'none',
                        color: 'black',
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Home
                </Typography>

                <Typography
                    component={Link}
                    href={`/products/${product.category}`}
                    onClick={handleBreadcrumbClick(`/products/${product.category}`)}
                    sx={{
                        textDecoration: 'none',
                        color: 'black',
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        textTransform: 'capitalize',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {product.category}
                </Typography>

                <Typography
                    color="text.primary"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.85rem', sm: '1rem' },
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: { xs: '100px', sm: '250px' },
                    }}
                >
                    {product.title}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
}

export default BreadCrumbs;