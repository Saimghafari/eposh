'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Tab,
    Rating,
    CircularProgress,
    Grid,
    Divider
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { fetchProducts } from '@/Redux/ProductsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import ProductsCards from '@/Components/ProductsCards';
import BreadCrumbs from '@/Components/BreadCrumbs';
import { addToCart } from '@/Redux/cartSlice';
import DrawerProduct from '@/Components/DrawerProduct';
import Link from 'next/link';


function ProductDetailPage() {
    const [value, setValue] = useState('1');
    const [categoryProduct, setCategoryProducts] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [quantity, setQuantity] = useState(1);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDrawerOpen = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };
    const params = useParams();
    const slug = params?.slug;
    const dispatch = useDispatch();

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };


    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const product = products?.find((item) => item.id === parseInt(slug));

    useEffect(() => {
        if (product?.category) {
            const filtered = products.filter((p) => p.category === product.category);
            setCategoryProducts(filtered);
        }
    }, [product, products, slug]);

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
    if (!product) return <Typography>Product not found</Typography>;




    return (
        <Box>
            <Box sx={{ pt: '2rem', px: { xs: '1rem', sm: '2rem' } }}>
                <BreadCrumbs product={product} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 3, py: 4 }}>
                {/* Product Image Section */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Box
                            component="img"
                            src={product.images[0]}
                            alt={product.title}
                            sx={{
                                width: { xs: 300, sm: 400, md: 350, lg: 400 },
                                height: { xs: 300, sm: 400, md: 350, lg: 400 },
                                objectFit: 'contain',
                                border: '1px solid black',
                                borderRadius: 2,
                                my: 2,
                            }}
                        />
                    </Box>
                </Box>


                <Box sx={{ width: { xs: '100%', md: '50%' }, px: 3, mt: { xs: 4, md: 1 } }}>

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {product.title}
                    </Typography>


                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">
                            SKU: {product.sku}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            VENDOR: eposh.pk
                        </Typography>
                        <Rating value={product.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography fontWeight="bold">Discount: {product.discountPercentage}%</Typography>
                        <Typography fontWeight="bold">Price: ${product.price}</Typography>
                    </Box>


                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                            QUANTITY
                        </Typography>
                        <TextField
                            value={quantity}
                            size="small"
                            color='black'
                            sx={{ width: 80 }}
                            inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                        />
                        <Button variant="outlined" color='black' onClick={handleDecrement} >–</Button>
                        <Button variant="outlined" color='black' onClick={handleIncrement} >+</Button>
                    </Box>

                    {/* Add to Cart */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#333' },
                            mb: 2,
                        }}
                        onClick={() => {
                            dispatch(addToCart({ ...product, quantity }));
                            toggleDrawerOpen(true)();
                        }}
                    >
                        ADD TO CART
                    </Button>
                    <DrawerProduct openDrawer={openDrawer} toggleDrawerOpen={toggleDrawerOpen} />

                    <Box sx={{ mb: 2 }}>
                        <Button fullWidth variant="outlined" color='black'>ADD TO COMPARE</Button>
                    </Box>

                    {/* Cash on Delivery */}
                    <Link href='/checkout' style={{textDecoration: 'none'}}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                '&:hover': { bgcolor: '#333' },
                                mb: 3,
                            }}
                        >
                            <span style={{ fontSize: 18 }}>🛒</span>
                            Buy with Cash on Delivery
                        </Button>
                    </Link>


                    <Box
                        sx={{
                            textAlign: 'center',
                            borderTop: '1px solid #ccc',
                            borderBottom: '1px solid #ccc',
                            py: 1,
                        }}
                    >
                        <Typography fontWeight="bold" color="text.secondary">
                            Guaranteed safe checkout
                        </Typography>
                    </Box>
                </Box>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '90%', mt: 5, }}>
                    <TabContext value={value}>
                        {/* Colorful Tabs */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 1, sm: 2 } }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    overflowX: 'auto',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    '&::-webkit-scrollbar': { display: 'none' },
                                }}
                            >
                                <TabList
                                    onChange={handleChange}
                                    aria-label="Product tabs"
                                    TabIndicatorProps={{ style: { display: 'none' } }}
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        minWidth: 'max-content',
                                        '& .MuiTab-root': {
                                            textTransform: 'uppercase',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            borderRadius: '12px 12px 0 0',
                                            px: 2,
                                            py: 1,
                                            backgroundColor: 'white',
                                            color: 'black',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: '#e0e7ff',
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                            },
                                        },
                                        '& .Mui-selected': {
                                            backgroundColor: 'black',
                                            color: 'white !important',
                                            fontWeight: 'bold',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                >
                                    <Tab label="Product Information" value="1" />
                                    <Tab label="Customer Reviews" value="2" />
                                </TabList>
                            </Box>
                        </Box>


                        {/* Product Info Panel */}
                        <TabPanel value="1" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2, mt: -1 }}>
                            <Box sx={{ lineHeight: 2, fontSize: '1rem' }}>
                                <Typography><strong>Warranty:</strong> {product.warrantyInformation}</Typography>
                                <Typography><strong>Brand:</strong> {product.brand}</Typography>
                                <Typography><strong>Stock:</strong> {product.stock}</Typography>
                                <Typography sx={{ mt: 2 }}><strong>Description:</strong> {product.description}</Typography>
                            </Box>
                        </TabPanel>

                        {/* Reviews Panel */}
                        <TabPanel value="2" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2, mt: -1 }}>
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            mb: 3,
                                            p: 2.5,
                                            borderRadius: 2,
                                            backgroundColor: '#f9fafb',
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                                        }}
                                    >
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {review.reviewerName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.reviewerEmail}
                                        </Typography>
                                        <Rating value={review.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {review.comment}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography color="text.secondary">No reviews yet.</Typography>
                            )}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
            <Box>
                <Box sx={{ mt: 10, px: 6 }}>
                    <Divider variant='middle' sx={{ backgroundColor: '#000', height: '1px' }} />
                </Box>

                <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }} >
                        May You Also Like
                    </Typography>
                </Box>

                <Box sx={{ mt: 5 }}>
                    <Grid container spacing={2} justifyContent='center'>
                        {categoryProduct.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                <ProductsCards product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

        </Box>
    );
}

export default ProductDetailPage;