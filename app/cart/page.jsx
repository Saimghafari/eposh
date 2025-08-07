'use client';
import React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TextField,
    Paper,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { addToCart, incremental, decrement, removeFromCart, clearCart } from '@/Redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Rating } from '@mui/material';

function Page() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems) || [];
    const total = (useSelector((state) => state.cart.totalPrice) || 0).toFixed(2);

    return (
        <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>

            {cart.length === 0 ? (

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        minHeight: { xs: '30vh', sm: '40vh', md: '50vh' },
                        textAlign: 'center',
                        py: { xs: 4, md: 8 }
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'normal' }}>
                        Shopping Bag is Empty
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                        Your shopping bag is empty.
                    </Typography>

                    <Link href='/'>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: 'text.primary',
                                color: 'text.primary',
                                textTransform: 'uppercase',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: 'text.primary',
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            CONTINUE SHOPPING
                        </Button>
                    </Link>
                </Box>
            ) : (

                <>
                    <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'normal' }}>
                        Shopping Bag
                    </Typography>

                    <TableContainer component={Paper} elevation={0}>
                        <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>PRODUCT</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>PRICE</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>QUANTITY</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>TOTAL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    size="small"
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                                <Box
                                                    component="img"
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    sx={{ width: 100, height: 100, borderRadius: '8px' }}
                                                />
                                                <Box>
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.category}
                                                    </Typography>

                                                    <Rating value={item.rating} readOnly size="small" sx={{ mt: 0.5, ml: -0.5 }} />

                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1">Rs.{item.price.toFixed(2)}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                                <IconButton
                                                    onClick={() => dispatch(decrement(item.id))}
                                                    size="small"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    –
                                                </IconButton>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                    sx={{ width: 60 }}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <IconButton
                                                    onClick={() => dispatch(incremental(item.id))}
                                                    size="small"
                                                >
                                                    +
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body1">
                                                Rs.{(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Paper
                        sx={{
                            mt: 4,
                            p: 2,
                            backgroundColor: '#e0f2f1',
                            color: '#00796b',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '8px',
                            boxShadow: 'none',
                        }}
                        elevation={0}
                    >
                        <LocalShippingIcon sx={{ mr: 1 }} />
                        <Typography variant="body1" fontWeight="medium">
                            Free Shipping
                        </Typography>
                    </Paper>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 4 }}
                    >
                        <Link href='/'>
                            <Button
                                variant="text"
                                startIcon={<ArrowBackIcon />}
                                sx={{ color: 'text.primary', '&:hover': { backgroundColor: 'transparent' } }}
                            >
                                CONTINUE SHOPPING
                            </Button>
                        </Link>
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            sx={{
                                backgroundColor: '#fff',
                                color: 'text.primary',
                                border: '1px solid #ccc',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={() => dispatch(clearCart())}
                        >
                            CLEAR CART
                        </Button>
                        <Link href='/checkout' style={{ textDecoration: 'none' }}>
                            <Button
                                variant="text"
                                sx={{ color: 'text.primary', '&:hover': { backgroundColor: 'transparent' } }}
                            >
                                Check Out
                                <Box
                                    
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transform: 'rotate(180deg)',
                                        ml: 1
                                    }}
                                >
                                    <ArrowBackIcon />
                                </Box>
                            </Button>
                        </Link>

                    </Stack>
                </>
            )}
        </Box>
    );
}

export default Page;