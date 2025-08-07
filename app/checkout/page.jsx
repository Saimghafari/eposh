'use client';
import React, { useState } from 'react';
import {
  Box, Typography, Button, Stack, IconButton, TextField,
  Divider, InputAdornment, Alert, FormControlLabel,
  Checkbox, MenuItem, Grid, RadioGroup, Radio,
  FormControl, FormHelperText, Collapse, Snackbar,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormik, FastField } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, checkOut, resetCheckout } from '@/Redux/CheckOutSlice';
import { clearCart } from '@/Redux/cartSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const countries = ["Pakistan", "Australia", "USA", "UK", "Canada"];

// Yup Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  firstName: Yup.string().min(2, 'First name must be at least 2 characters').required('First Name is required'),
  lastName: Yup.string().min(2, 'Last name must be at least 2 characters').required('Last Name is required'),
  address: Yup.string().min(5, 'Address must be at least 5 characters').required('Address is required'),
  city: Yup.string().min(5, 'City must be at least 5 characters').required('City is required'),
  postal: Yup.string().matches(/^\d{5}(-\d{4})?$/, 'Invalid postal code').required('Postal code is required'), // Made required as per standard checkout
  contactNo: Yup.string().matches(/^\+?\d{10,15}$/, 'Invalid phone number').required('Contact number is required'),
});

function Page() {
  const cart = useSelector((state) => state.cart.cartItems) || [];
  const router = useRouter();
  const dispatch = useDispatch();

  const subtotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const total = (useSelector((state) => state.cart.totalPrice) || 0).toFixed(2);

  const { userDetails, status, error } = useSelector((state) => state.checkOut);
  const [billingSame, setBillingSame] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // can be 'success' | 'error' | 'info' | 'warning'
  });

  const handleBillingToggle = (e) => {
    setBillingSame(e.target.value === "same");
  };

  const formik = useFormik({
    initialValues: {
      email: userDetails?.email || '',
      country: 'Pakistan',
      firstName: userDetails?.firstName || '',
      lastName: userDetails?.lastName || '',
      address: userDetails?.address || '',
      apartment: userDetails?.apartment || '',
      city: userDetails?.city || '',
      postal: userDetails?.postal || '',
      contactNo: userDetails?.contactNo || '',
      news: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setUserDetails(values));

        // unwrap will throw if checkout sets status to 'error'
        await dispatch(checkOut({ cartItems: cart, userDetails: values })).unwrap();

        setSnackbar({
          open: true,
          message: 'Order placed successfully! Redirecting...',
          severity: 'success',
        });

        dispatch(clearCart());

        setTimeout(() => {
          router.push('/');

          // reset checkout state after short delay
          setTimeout(() => dispatch(resetCheckout()), 500);
        }, 3000); // matches autoHideDuration of snackbar
      } catch (err) {
        // if checkout failed: show error snackbar
        setSnackbar({
          open: true,
          message: err?.message || 'An error occurred during checkout.',
          severity: 'error',
        });
      }
    }




  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        maxWidth: '1200px',
        margin: 'auto',
        p: { xs: 2, md: 4 },
        gap: { xs: 4, md: 8 },
      }}
    >

      <Box sx={{ width: { xs: '100%', md: '50%' } }}>

        {/* Status Alerts */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>


        {cart.length > 0 ? (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 5,
            }}
          >
            {/* Contact Section */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h6" fontWeight="normal">
                Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link href='/login'>
                  <Button variant="text" size="small" sx={{ textTransform: 'none', px: 0 }}>
                    Log In
                  </Button>
                </Link>
              </Typography>
            </Stack>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="news"
                  checked={formik.values.news}
                  onChange={formik.handleChange}
                />
              }
              label="Email me with news and offers"
            />

            <Divider sx={{ my: 2 }} />

            {/* Delivery Section */}
            <Typography variant="h6" fontWeight="normal" sx={{ mb: 1 }}>
              Delivery
            </Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                select
                name="country"
                label="Country/Region"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First name"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              name="address"
              label="Address"
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && !!formik.errors.address}
              helperText={formik.touched.address && formik.errors.address}
            />

            <TextField
              fullWidth
              name="apartment"
              label="Apartment, suite, etc. (optional)"
              variant="outlined"
              value={formik.values.apartment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="city"
                  label="City"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && !!formik.errors.city}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="postal"
                  label="Postal code"
                  variant="outlined"
                  value={formik.values.postal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.postal && !!formik.errors.postal}
                  helperText={formik.touched.postal && formik.errors.postal}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              name="contactNo"
              label="Phone number"
              variant="outlined"
              type="tel"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactNo && !!formik.errors.contactNo}
              helperText={formik.touched.contactNo && formik.errors.contactNo}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <InfoOutlinedIcon fontSize="small" color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox name="saveInformation" />}
              label="Save this information for next time"
            />

            <Divider sx={{ my: 2 }} />

            {/* Shipping Method */}
            <Typography variant="h6" fontWeight="normal" mt={2}>
              Shipping method
            </Typography>
            <Box
              sx={{
                border: "1px solid #cce5ff",
                bgcolor: "#e6f2ff",
                borderRadius: 1,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Free Shipping</Typography>
              <Typography fontWeight={500}>FREE</Typography>
            </Box>

            {/* Payment */}
            <Typography variant="h6" fontWeight="normal" mt={4}>
              Payment
            </Typography>
            <FormHelperText sx={{ mb: 1 }}>
              All transactions are secure and encrypted.
            </FormHelperText>
            <RadioGroup name="paymentMethod" defaultValue="cod">
              <Box sx={{ border: "1px solid #cce5ff", borderRadius: 1, mb: 1 }}>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery (COD)"
                  sx={{ px: 2, py: 1 }}
                />
                <Typography sx={{ px: 6, pb: 1, fontSize: "0.875rem", color: "gray" }}>
                  You Have To Pay Amount At The Time Of Delivery.
                </Typography>
              </Box>

              <Box sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Deposit"
                  sx={{ px: 2, py: 1 }}
                />
              </Box>
            </RadioGroup>

            {/* Billing Address */}
            <Typography variant="h6" fontWeight="normal" mt={4}>
              Billing address
            </Typography>
            <RadioGroup value={billingSame ? "same" : "different"} onChange={handleBillingToggle}>
              <Box
                sx={{
                  border: billingSame ? "2px solid #1976d2" : "1px solid #ddd",
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: billingSame ? "#e3f2fd" : "inherit",
                }}
              >
                <FormControlLabel
                  value="same"
                  control={<Radio />}
                  label="Same as shipping address"
                  sx={{ px: 2, py: 1 }}
                />
              </Box>
              <Box
                sx={{
                  border: !billingSame ? "2px solid #1976d2" : "1px solid #ddd",
                  borderRadius: 1,
                  bgcolor: !billingSame ? "#e3f2fd" : "inherit",
                }}
              >
                <FormControlLabel
                  value="different"
                  control={<Radio />}
                  label="Use a different billing address"
                  sx={{ px: 2, py: 1 }}
                />
              </Box>
            </RadioGroup>

            {/* Conditional Billing Form */}
            <Collapse in={!billingSame}>
              <Box sx={{ mt: 2, pl: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Billing Address
                </Typography>
                <TextField fullWidth label="Full name" sx={{ mb: 2 }} />
                <TextField fullWidth label="Address" sx={{ mb: 2 }} />
                <TextField fullWidth label="Apartment, suite, etc. (optional)" sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="City" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Postal Code" />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                backgroundColor: "#1a1a1a",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
            >
              Complete order
            </Button>
          </Box>
        ) : (

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
          </Box>
        )}
      </Box>

      {/* ----------------------------- Orders Detail (Right Section) ------------------------------------ */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          backgroundColor: '#f5f5f5',
          p: 3,
          borderRadius: '8px',
          ml: { xs: 0, md: 4 },
          mt: { xs: 4, md: 5 },
          position: 'sticky',
          top: 20,
          alignSelf: 'flex-start',
          zIndex: 1,
        }}
      >

        {cart.length > 0 ? (
          cart.map((item) => (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, }} key={item.id}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={item.images?.[0]}
                  alt={item.title}
                  sx={{ width: 80, height: 80, borderRadius: '8px', border: '1px solid #e0e0e0' }}
                />
                {/* Quantity Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'grey.600',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    border: '2px solid #f5f5f5',
                  }}
                >
                  {item.quantity}
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  {item.title}
                </Typography>

                {item.detail && (
                  <Typography variant="body2" color="text.secondary">
                    {item.detail}
                  </Typography>
                )}
              </Box>
              <Typography variant="body1" fontWeight="medium">
                Rs {(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Stack>
          ))
        ) : (

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No items in cart for summary.
          </Typography>
        )}


        <Divider sx={{ my: 3 }} />


        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Subtotal
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            Rs {subtotalPrice}
          </Typography>
        </Stack>


        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Shipping
            <IconButton size="small" sx={{ ml: 0.5, p: 0, verticalAlign: 'middle' }}>
              <InfoOutlinedIcon fontSize="small" color="action" />
            </IconButton>
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            FREE
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />


        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography variant="h5" fontWeight="bold">
              Rs {total}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;