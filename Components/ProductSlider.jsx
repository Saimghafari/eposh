'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
    Box,
    Typography,
    IconButton,
    CircularProgress,
    Divider
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { fetchProducts } from '@/Redux/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductsCards from './ProductsCards';

function NextArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: { xs: -10, sm: -20 },
                transform: 'translateY(-50%)',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                boxShadow: 2,
                zIndex: 2,
                width: { xs: 28, sm: 36 },      // Smaller size on xs
                height: { xs: 28, sm: 36 },
                '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                },
            }}
        >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </IconButton>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: { xs: -10, sm: -20 },
                transform: 'translateY(-50%)',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                boxShadow: 2,
                zIndex: 2,
                width: { xs: 28, sm: 36 },
                height: { xs: 28, sm: 36 },
                '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                },
            }}
        >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </IconButton>
    );
}


const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: '0px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1200,
            settings: { slidesToShow: 3 },
        },
        {
            breakpoint: 900,
            settings: { slidesToShow: 2 },
        },
        {
            breakpoint: 600,
            settings: { slidesToShow: 1 },
        },
    ],
};

function ProductSlider() {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const filtered = products.filter(
            (p) => p.category === 'beauty' || p.category === 'groceries'
        );
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

    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    px: { xs: 2, sm: 4, md: 10 },
                    py: { xs: 4, md: 8 },
                    position: 'relative',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        fontWeight: 'bold',
                        mb: { xs: 3, md: 5 },
                        textAlign: 'center',
                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' }
                    }}
                >
                    Beauty & Groceries
                </Typography>

                <Slider {...sliderSettings}>
                    {categoryProducts.map((product, index) => (
                        <Box key={index} sx={{ px: 1 }}>
                            <ProductsCards product={product} />
                        </Box>
                    ))}
                </Slider>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 6, md: 10 } }}>
                    <Typography variant='h5' sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                        World Of EPOSH
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ mx: { xs: 2, md: 6 }, mb: { xs: 4, md: 8 } }}>
                <Divider
                    variant="middle"
                    sx={{
                        borderBottomWidth: '2px',
                        mt: { xs: 6, md: 10 },
                    }}
                />
            </Box>
        </Box>
    );
}

export default ProductSlider;
