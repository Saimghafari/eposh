'use client';
import React, { useState, } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Link from 'next/link';
import { addToCart } from '@/Redux/cartSlice';
import { useDispatch } from 'react-redux';
import DrawerProduct from './DrawerProduct';

function ProductsCards({ product }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isOutOfStock = product?.stock === 0;
  const dispatch = useDispatch();

  const toggleDrawerOpen = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Box>
      <Card
        sx={{
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 30px rgba(0,0,0,0.15)',
          },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >

        <Box sx={{ position: 'relative' }}>
          <Link href={`/product/${product.id}`}>     {/* // product details page path */}
            <CardMedia
              component="img"
              height="220"
              image={product.images[0]}
              alt={product.title}
              sx={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Stock or Out of Stock Label */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: isOutOfStock ? '#d32f2f' : '#2e7d32',
              color: '#fff',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '4px',
              zIndex: 10,
              fontWeight: 'bold',
            }}
          >
            {isOutOfStock ? 'OUT OF STOCK' : `Stock: ${product.stock}`}
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ px: 1.5, pt: 1, pb: 0.5, flexGrow: 1 }}>
          {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {product.website}
          </Typography> */}

          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>

            {product.title.length > 28                  // maximum 28 characters title remaining hide ...
              ? `${product.title.slice(0, 28)}...`
              : product.title}

          </Typography>

          <Typography variant="body2" color="text.secondary">
            Discount: {product.discountPercentage}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" color="error">
            Rs.{product.price}
          </Typography>
        </CardContent>

        {/* Card Actions */}
        <CardActions sx={{ flexDirection: 'column', gap: 1, px: 1.5, pb: 1.5 }}>
          <Button
            variant="outlined"
            fullWidth
            disabled={isOutOfStock}
            sx={{
              backgroundColor: isOutOfStock ? '#f3f3f3' : 'white',
              color: '#000',
              borderColor: '#ccc',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (!isOutOfStock) {
                dispatch(addToCart(product));
                toggleDrawerOpen(true)();
              }
            }}
          >
            {isOutOfStock ? 'SOLD OUT' : 'Add To Cart'}
          </Button>
          <DrawerProduct openDrawer={openDrawer} toggleDrawerOpen={toggleDrawerOpen} />
          <Link href='/checkout' style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LocalShippingIcon />}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Buy with Cash on Delivery
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ProductsCards;